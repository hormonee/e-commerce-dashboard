import { ProductRegistrationForm } from "@/src/features/product/presentation/components/ProductRegistrationForm";

export default function ProductRegisterPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">신규 상품 등록</h1>
            <ProductRegistrationForm />
        </div>
    );
}
