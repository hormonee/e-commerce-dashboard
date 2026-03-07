import { z } from "zod";

export const updateSettingsSchema = z.object({
    storeName: z.string().min(1, '상점 이름은 필수입니다.').max(100),
    contactEmail: z.string().email('유효한 이메일 주소를 입력해주세요.'),
    storeDescription: z.string().max(500).optional(),
    addressLine1: z.string().max(255).optional(),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    zipCode: z.string().max(20).optional(),
    maintenanceMode: z.boolean().optional(),
    customerAccounts: z.boolean().optional(),
});

export type UpdateSettingsDto = z.infer<typeof updateSettingsSchema>;
