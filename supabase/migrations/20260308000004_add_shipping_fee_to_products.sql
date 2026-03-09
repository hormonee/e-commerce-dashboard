-- products 테이블에 shipping_fee 컬럼 추가
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS shipping_fee NUMERIC DEFAULT 0 NOT NULL;