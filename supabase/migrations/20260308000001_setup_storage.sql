-- 1. 스토리지 버킷 생성 (product-images)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. 관리자 확인 함수 (SECURITY DEFINER로 RLS 우회 권한 부여)
-- 기존 함수가 있을 수 있으므로 CREATE OR REPLACE 사용
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'ADMIN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. 스토리지 RLS 정책 설정
-- (참고: storage.objects의 RLS는 Supabase에서 기본적으로 활성화되어 있으며,
-- 시스템 테이블 권한 문제로 인해 ALTER TABLE 구문은 생략합니다.)

-- 조회: 누구나 가능 (Public Bucket)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'product-images');

-- 업로드/수정/삭제: 관리자만 가능
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
CREATE POLICY "Admin Upload" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND public.is_admin()
);

DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
CREATE POLICY "Admin Update" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'product-images' AND public.is_admin()
);

DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;
CREATE POLICY "Admin Delete" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'product-images' AND public.is_admin()
);
