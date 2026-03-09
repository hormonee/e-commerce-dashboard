-- 1. products 테이블에 sku 컬럼 추가
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sku TEXT;

-- 2. shipping_type 제약 조건 수정 (엔티티와 일치하도록 CONDITIONAL_FREE 추가)
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_shipping_type_check;
ALTER TABLE public.products ADD CONSTRAINT products_shipping_type_check 
  CHECK (shipping_type IN ('FREE', 'PAID', 'CONDITIONAL_FREE', 'CONDITION_FREE'));

-- 3. 기존 데이터 중 배송 타입이 잘못된 경우 보정 (필요 시)
UPDATE public.products SET shipping_type = 'CONDITIONAL_FREE' WHERE shipping_type = 'CONDITION_FREE';
