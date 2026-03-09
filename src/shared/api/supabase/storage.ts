import { createClient as createBrowserClient } from './client';

export interface StorageUploadResult {
    url: string | null;
    path: string | null;
    error: Error | null;
}

/**
 * 클라이언트 전용 Supabase Storage 서비스
 * 클라이언트 컴포넌트에서 안전하게 사용할 수 있습니다.
 */
export class SupabaseStorageService {
    private static BUCKET_NAME = 'product-images';

    /**
     * 이미지를 Supabase Storage에 업로드합니다 (클라이언트 전용).
     */
    static async uploadImage(
        file: File | Blob,
        path: string
    ): Promise<StorageUploadResult> {
        try {
            const supabase = createBrowserClient();

            const fileExt = path.split('.').pop();
            const fileName = `${path.split('.')[0]}_${Date.now()}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from(this.BUCKET_NAME)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from(this.BUCKET_NAME)
                .getPublicUrl(data.path);

            return {
                url: publicUrl,
                path: data.path,
                error: null
            };
        } catch (error) {
            console.error('SupabaseStorageService.uploadImage error:', error);
            return {
                url: null,
                path: null,
                error: error as Error
            };
        }
    }

    /**
     * 스토리지에서 이미지를 삭제합니다 (클라이언트 전용).
     */
    static async deleteImage(path: string): Promise<boolean> {
        try {
            const supabase = createBrowserClient();

            const { error } = await supabase.storage
                .from(this.BUCKET_NAME)
                .remove([path]);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('SupabaseStorageService.deleteImage error:', error);
            return false;
        }
    }
}
