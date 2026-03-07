-- 1. 기초 상점 설정
INSERT INTO public.store_settings (id, store_name, support_email, description, address_line, city, state, zip_code)
VALUES (1, 'Antigravity Dashboard Store', 'test@test.com', 'Modern E-Commerce Management System', '123 AI Boulevard', 'Seoul', 'Seoul', '06000')
ON CONFLICT (id) DO UPDATE SET store_name = EXCLUDED.store_name;

-- 2. 테스트용 상품 데이터 추가
INSERT INTO public.products (id, name, description, category_large, category_medium, category_small, manufacturer, brand, regular_price, discount_rate, stock_quantity, status, main_image_url)
VALUES 
  ('a0000001-0000-0000-0000-000000000001', '프리미엄 무선 헤드셋', '균형 잡힌 사운드와 노이즈 캔슬링 기능을 제공합니다.', '전자제품', '음향기기', '헤드셋', '사운드마스터', 'Aura', 299000, 10, 50, 'ON_SALE', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
  ('a0000001-0000-0000-0000-000000000002', '미니멀리스트 기계식 키보드', '체리 갈축 스위치를 탑재한 87키 텐키리스 키보드입니다.', '전자제품', '컴퓨터 주변기기', '키보드', '키크론', 'Keychron', 159000, 5, 30, 'ON_SALE', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'),
  ('a0000001-0000-0000-0000-000000000003', '고성능 게이밍 마우스', '16000 DPI 센서와 커스텀 RGB 조명을 지원합니다.', '전자제품', '컴퓨터 주변기기', '마우스', '로지텍', 'Logitech', 89000, 15, 100, 'ON_SALE', 'https://images.unsplash.com/photo-1527814732931-419a15c3924a'),
  ('a0000001-0000-0000-0000-000000000004', '울트라 와이드 34인치 모니터', '21:9 비율의 WQHD 해상도로 압도적인 몰입감을 제공합니다.', '전자제품', '디스플레이', '모니터', '삼성전자', 'Samsung', 750000, 0, 15, 'ON_SALE', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf'),
  ('a0000001-0000-0000-0000-000000000005', '노이즈 캔슬링 이어폰 Pro', '액티브 노이즈 캔슬링과 투명 모드를 지원하는 무선 이어폰.', '전자제품', '음향기기', '이어폰', 'Apple', 'Apple', 329000, 12, 0, 'SOLD_OUT', 'https://images.unsplash.com/photo-1588423770574-91993ca06f17'),
  ('a0000001-0000-0000-0000-000000000006', '에센셜 데일리 티셔츠', '100% 프리미엄 코튼 소재로 제작된 베이직 티셔츠.', '패션', '남성의류', '상의', '베이직팩토리', 'Basic', 29000, 0, 500, 'ON_SALE', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'),
  ('a0000001-0000-0000-0000-000000000007', '테이퍼드 핏 데님 팬츠', '자연스러운 워싱과 편안한 착용감의 데님 팬츠.', '패션', '남성의류', '하의', 'Levi''s', 'Levis', 129000, 20, 120, 'ON_SALE', 'https://images.unsplash.com/photo-1542272604-787c3835535d'),
  ('a0000001-0000-0000-0000-000000000008', '비건 가죽 숄더백', '친환경 비건 가죽 소재의 모던한 숄더백.', '패션', '잡화', '가방', '스탠드오일', 'Standoff', 98000, 5, 45, 'ON_SALE', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa');

-- 3. 상품 옵션(Variants) 추가
INSERT INTO public.product_variants (id, product_id, option_combination, additional_price, stock_quantity)
VALUES 
  (gen_random_uuid(), 'a0000001-0000-0000-0000-000000000001', 'Black', 0, 25),
  (gen_random_uuid(), 'a0000001-0000-0000-0000-000000000001', 'Silver', 10000, 25),
  (gen_random_uuid(), 'a0000001-0000-0000-0000-000000000006', 'White / Small', 0, 100),
  (gen_random_uuid(), 'a0000001-0000-0000-0000-000000000006', 'White / Medium', 0, 150),
  (gen_random_uuid(), 'a0000001-0000-0000-0000-000000000006', 'Navy / Medium', 0, 120),
  (gen_random_uuid(), 'a0000001-0000-0000-0000-000000000007', 'Deep Blue / 30', 0, 40),
  (gen_random_uuid(), 'a0000001-0000-0000-0000-000000000007', 'Deep Blue / 32', 0, 50);

-- 4. 테스트용 사용자 추가 (auth.users 가정이 필요하므로, 여기서는 public.users에 직접 넣는 예시를 보여줌)
-- 실제 운영에서는 auth.signUp 등으로 생성해야 하나, SQL Editor에서는 직접 public.users에 강제 주입하여 테스트 가능 (FK 체크를 잠시 끌 수 있음)
-- 하지만 RLS가 켜져있으므로 조심해야 함. 여기서는 아이디를 고정하여 테스트 시나리오 구성.

-- 주의: auth.users 와 public.users 간의 관계 때문에 직접 insert는 실패할 수 있음. 
-- 대신, 기존 유저가 하나라도 있다면 그 ID를 기반으로 주문을 넣는 것이 좋음.
-- 여기서는 시연을 위해 uuid를 하드코딩한 목 사용자를 삽입 (FK 제약이 auth.users에 있으므로 실제론 auth.users에 먼저 있어야 함)

/* 
-- 이 부분은 Supabase SQL Editor에서 실행 시 auth.users에 직접 삽입이 제한될 수 있습니다.
INSERT INTO auth.users (id, email, encrypted_password) 
VALUES ('u0000000-0000-0000-0000-000000000001', 'customer1@example.com', 'password123');
*/

-- 5. 주문 데이터 (가상의 날짜들로 매출 분석용 데이터 생성)
-- 최근 7일간의 매출 데이터를 시뮬레이션
INSERT INTO public.orders (id, order_number, customer_id, order_status, total_product_amount, shipping_fee, final_amount, created_at)
VALUES 
  (gen_random_uuid(), 'ORD-20260301-1001', NULL, 'DELIVERED', 269100, 0, 269100, NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), 'ORD-20260302-1001', NULL, 'DELIVERED', 151050, 3000, 154050, NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), 'ORD-20260303-1001', NULL, 'DELIVERED', 89000, 0, 89000, NOW() - INTERVAL '4 days'),
  (gen_random_uuid(), 'ORD-20260304-1001', NULL, 'DELIVERED', 598000, 0, 598000, NOW() - INTERVAL '3 days'),
  (gen_random_uuid(), 'ORD-20260305-1001', NULL, 'SHIPPING', 129000, 0, 129000, NOW() - INTERVAL '2 days'),
  (gen_random_uuid(), 'ORD-20260306-1001', NULL, 'PAYMENT_COMPLETED', 29000, 2500, 31500, NOW() - INTERVAL '1 days'),
  (gen_random_uuid(), 'ORD-20260307-1001', NULL, 'PAYMENT_PENDING', 750000, 0, 750000, NOW());

-- 6. 주문 상세 데이터 (주문과 상품 연결)
-- 주문 ID를 가져오기 위해 서브쿼리나 CTE 사용 가능하지만 여기서는 수동 매핑 생략하고 예시만 작성
-- (주문 루프를 돌며 order_items를 채우는 로직은 복잡하므로, 가장 최근 주문들에 연결)
INSERT INTO public.order_items (order_id, product_id, quantity, unit_price)
SELECT id, 'a0000001-0000-0000-0000-000000000001', 1, 269100 FROM public.orders WHERE order_number = 'ORD-20260301-1001';

INSERT INTO public.order_items (order_id, product_id, quantity, unit_price)
SELECT id, 'a0000001-0000-0000-0000-000000000002', 1, 151050 FROM public.orders WHERE order_number = 'ORD-20260302-1001';

-- 7. 상품 이미지 추가
INSERT INTO public.product_images (product_id, image_url, display_order)
VALUES 
  ('a0000001-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1546435770-a3e426bb472b', 1),
  ('a0000001-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae', 1);

-- 8. 주문 이력(History) 추가
INSERT INTO public.order_history (order_id, status, note)
SELECT id, 'PAYMENT_COMPLETED', '결제가 완료되었습니다.' FROM public.orders WHERE order_number = 'ORD-20260306-1001';

INSERT INTO public.order_history (order_id, status, note)
SELECT id, 'SHIPPING', '상품 배송이 시작되었습니다.' FROM public.orders WHERE order_number = 'ORD-20260305-1001';
