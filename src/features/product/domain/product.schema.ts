import { z } from 'zod';

export const productRegistrationSchema = z.object({
    name: z.string()
        .min(1, '상품명을 입력해주세요.')
        .max(100, '상품명은 최대 100자까지 가능합니다.'),
    promotionText: z.string().optional(),
    category: z.object({
        large: z.string().min(1, '대분류를 선택해주세요.'),
        medium: z.string().min(1, '중분류를 선택해주세요.'),
        small: z.string().min(1, '소분류를 선택해주세요.'),
    }),
    price: z.object({
        regular: z.number()
            .min(1, '정상가는 1원 이상이어야 합니다.'),
        discountRate: z.number().min(0).max(100),
        final: z.number().min(0),
    }),
    stockCount: z.number()
        .min(0, '재고 수량은 0개 이상이어야 합니다.'),
    purchaseLimit: z.number().min(0),
    mainImageUrl: z.string().min(1, '대표 이미지를 업로드해주세요.'),
    additionalImageUrls: z.array(z.string()).max(10),
    options: z.array(z.object({
        name: z.string().min(1, '옵션명을 입력해주세요.'),
        values: z.array(z.string()).min(1, '옵션값을 최소 하나 이상 입력해주세요.'),
    })),
    description: z.string().min(1, '상품 상세 설명을 입력해주세요.'),
    shipping: z.object({
        type: z.enum(['FREE', 'PAID', 'CONDITIONAL_FREE']),
        fee: z.number().min(0),
        method: z.string().min(1, '배송 방법을 선택해주세요.'),
        originAddress: z.string().min(1, '출고지 주소를 입력해주세요.'),
        isBundleAvailable: z.boolean(),
    }),
    seo: z.object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        tags: z.array(z.string()).max(10),
    }),
});

export type ProductRegistrationData = z.infer<typeof productRegistrationSchema>;
