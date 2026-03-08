-- 1. public.users 테이블 생성 (auth.users와 연동)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'CUSTOMER' CHECK (role IN ('ADMIN', 'CUSTOMER')),
  tier TEXT DEFAULT 'NEW' CHECK (tier IN ('NEW', 'SILVER', 'GOLD', 'VIP')),
  total_orders INTEGER DEFAULT 0,
  ltv NUMERIC DEFAULT 0,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 상점 설정 테이블
CREATE TABLE public.store_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  store_name TEXT NOT NULL DEFAULT 'My Awesome Shop',
  support_email TEXT,
  description TEXT,
  address_line TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  maintenance_mode BOOLEAN DEFAULT FALSE,
  require_account BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 3. 상품 테이블
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category_large TEXT,
  category_medium TEXT,
  category_small TEXT,
  manufacturer TEXT,
  brand TEXT,
  regular_price NUMERIC NOT NULL DEFAULT 0,
  discount_rate NUMERIC DEFAULT 0,
  final_price NUMERIC GENERATED ALWAYS AS (regular_price * (1 - discount_rate / 100)) STORED,
  stock_quantity INTEGER DEFAULT 0,
  purchase_limit INTEGER,
  main_image_url TEXT,
  shipping_type TEXT DEFAULT 'FREE' CHECK (shipping_type IN ('FREE', 'PAID', 'CONDITION_FREE')),
  status TEXT DEFAULT 'ON_SALE' CHECK (status IN ('ON_SALE', 'SOLD_OUT', 'HIDDEN')),
  meta_title TEXT,
  meta_description TEXT,
  meta_tags JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 상품 추가 이미지 테이블
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- 5. 상품 옵션/변체(Variant) 테이블
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  option_combination TEXT NOT NULL, -- 예: "Black / Small"
  additional_price NUMERIC DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 주문 테이블
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.users(id),
  order_status TEXT DEFAULT 'PAYMENT_PENDING' CHECK (order_status IN ('PAYMENT_PENDING', 'PAYMENT_COMPLETED', 'SHIPPING_PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELED', 'RETURN_REQUESTED')),
  payment_method TEXT,
  total_product_amount NUMERIC NOT NULL DEFAULT 0,
  shipping_fee NUMERIC DEFAULT 0,
  coupon_discount NUMERIC DEFAULT 0,
  points_used NUMERIC DEFAULT 0,
  final_amount NUMERIC NOT NULL DEFAULT 0,
  shipping_recipient_name TEXT,
  shipping_phone TEXT,
  shipping_address TEXT,
  shipping_zipcode TEXT,
  courier_name TEXT,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 주문 상품 상세 테이블
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  variant_id UUID REFERENCES public.product_variants(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0
);

-- 8. 주문 처리 이력 테이블
CREATE TABLE public.order_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 고객 상담 메모 테이블
CREATE TABLE public.customer_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES public.users(id),
  note_content TEXT NOT NULL,
  is_important BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10.5 기존 정책 및 함수 일괄 삭제 (재설정용)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- 10.6 유저 핸들러 재정의 (안전성을 위해 SECURITY DEFINER 유지)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, tier)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    COALESCE(new.raw_user_meta_data->>'role', 'CUSTOMER'), 
    'NEW'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 10.5 기존 정책 및 함수 일괄 삭제 (재설정용)
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- 11. 행 레벨 보안 (RLS) 정책 설정 (최종 안정화 버전: 무한 재귀 배제)

-- 모든 테이블 RLS 활성화
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_notes ENABLE ROW LEVEL SECURITY;

-- 기존 정책 일괄 삭제
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- [관리자 정책] JWT role이 ADMIN이거나 특정 이메일인 경우 모든 권한 허용
-- users 테이블을 포함한 모든 테이블에 대해 적용 (서브쿼리 없음)
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('CREATE POLICY "admin_all_%I" ON public.%I FOR ALL USING (
      (auth.jwt() -> ''user_metadata'' ->> ''role'') = ''ADMIN'' 
      OR (auth.jwt() ->> ''email'') = ''admin@admin.com''
    );', t, t);
  END LOOP;
END $$;

-- [고객 및 공개 정책]
-- users: 본인만 접근
CREATE POLICY "users_customer" ON public.users FOR ALL USING (id = auth.uid());

-- products: 공개 조회
CREATE POLICY "products_public" ON public.products FOR SELECT USING (status != 'HIDDEN');
CREATE POLICY "product_images_public" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "product_variants_public" ON public.product_variants FOR SELECT USING (true);

-- orders: 본인 주문만 조회/생성
CREATE POLICY "orders_customer" ON public.orders FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "orders_insert" ON public.orders FOR INSERT WITH CHECK (customer_id = auth.uid());

-- order_items: 본인 주문의 아이템만 조회 (단방향 체크)
CREATE POLICY "order_items_customer" ON public.order_items FOR SELECT USING (
  order_id IN (SELECT id FROM public.orders WHERE customer_id = auth.uid())
);

-------------------------------
-- 1. 모든 테이블의 기존 정책 강제 삭제
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- 2. 관리자 정책 (JWT 기반 - 테이블 조회 없음)
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('CREATE POLICY "admin_access_all_%I" ON public.%I FOR ALL USING (
      (auth.jwt() -> ''user_metadata'' ->> ''role'') = ''ADMIN'' 
      OR (auth.jwt() ->> ''email'') = ''admin@admin.com''
    );', t, t);
  END LOOP;
END $$;

-- 3. 유저 자신의 데이터 접근 허용
CREATE POLICY "users_self_view" ON public.users FOR SELECT USING (id = auth.uid());
