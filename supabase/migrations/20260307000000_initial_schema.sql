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

-- 10. auth.users 생성을 감지하여 public.users에 자동 추가하는 트리거 설정
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, tier)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    'CUSTOMER', 
    'NEW'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 11. 행 레벨 보안 (RLS) 정책 설정

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

-- 관리자(ADMIN)를 위한 전역 접근 정책 (모든 테이블)
-- public.users에서 role을 확인하여 ADMIN인 경우 모든 행위 허용
DO $$
DECLARE
  table_name TEXT;
BEGIN
  FOR table_name IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('CREATE POLICY "Admins have full access on %I" ON public.%I FOR ALL USING (
      EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = ''ADMIN'')
    );', table_name, table_name);
  END LOOP;
END $$;

-- 고객(CUSTOMER)을 위한 개별 정책

-- users: 자신의 정보 조회 및 수정 가능
CREATE POLICY "Users can view and update their own record" ON public.users FOR ALL USING (
  id = auth.uid()
);

-- products: 판매 중인 상품 조회 가능
CREATE POLICY "Anyone can view products on sale" ON public.products FOR SELECT USING (
  status = 'ON_SALE'
);

-- product_images: 조회 가능
CREATE POLICY "Anyone can view product images" ON public.product_images FOR SELECT USING (true);

-- product_variants: 활성화된 옵션 조회 가능
CREATE POLICY "Anyone can view active variants" ON public.product_variants FOR SELECT USING (is_active = true);

-- orders: 자신의 주문 조회 및 생성 가능
CREATE POLICY "Customers can view their own orders" ON public.orders FOR SELECT USING (
  customer_id = auth.uid()
);
CREATE POLICY "Customers can create their own orders" ON public.orders FOR INSERT WITH CHECK (
  customer_id = auth.uid()
);

-- order_items: 자신의 주문 상품 조회 가능
CREATE POLICY "Customers can view their own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid())
);

-- order_history: 자신의 주문 이력 조회 가능
CREATE POLICY "Customers can view their own order history" ON public.order_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid())
);
