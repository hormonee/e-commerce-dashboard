-- 1. products 테이블 스키마 정합성 보장 (sku 추가 및 제약 조건 최신화)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'sku') THEN
        ALTER TABLE public.products ADD COLUMN sku TEXT;
    END IF;
END $$;

-- shipping_type 제약 조건 최신화 (CONDITIONAL_FREE 허용)
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_shipping_type_check;
ALTER TABLE public.products ADD CONSTRAINT products_shipping_type_check 
  CHECK (shipping_type IN ('FREE', 'PAID', 'CONDITIONAL_FREE', 'CONDITION_FREE'));

-- 2. RLS 정책 전면 개편 (is_admin() 함수 기반으로 통일)
-- 기존의 JWT user_metadata 기반 정책은 세션 갱신 문제로 인해 불안정할 수 있으므로, 
-- 검증된 public.users 테이블을 참조하는 is_admin() 함수를 전역적으로 사용합니다.

DO $$
DECLARE
  t TEXT;
  policy_name TEXT;
BEGIN
  -- public 스키마의 모든 테이블에 대해 기존 관리자 정책 삭제 및 신규 정책 적용
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    -- 기존 관리자 관련 정책들 삭제
    FOR policy_name IN (SELECT policyname FROM pg_policies WHERE tablename = t AND schemaname = 'public' AND policyname LIKE 'admin_%')
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', policy_name, t);
    END LOOP;

    -- 신규 통합 관리자 정책 생성 (is_admin() 함수 사용)
    EXECUTE format('CREATE POLICY "admin_full_access_%I" ON public.%I FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());', t, t);
  END LOOP;
END $$;

-- 3. 추가 조치: products 공개 조회 정책 유지
DROP POLICY IF EXISTS "products_public" ON public.products;
CREATE POLICY "products_public" ON public.products FOR SELECT USING (status != 'HIDDEN');
