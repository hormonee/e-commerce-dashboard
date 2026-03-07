---
trigger: always_on
---

# 🛠️ 기술 스택 및 연동 가이드라인 (Rules)

본 문서는 이커머스 대시보드 프로젝트에서 사용되는 주요 기술 스택(**Next.js App Router, Supabase, Tailwind CSS 등**)을 효율적이고 일관성 있게 사용하기 위한 구체적인 룰을 정의합니다. 

이 규칙은 🔗 `architecture.md` (클린 아키텍처) 및 🔗 `nextjs_rules.md` (Next.js 렌더링 최적화) 규칙을 보완하는 역할을 합니다.

---

## 1. Supabase 활용 가이드라인

### 1-1. 클라이언트(Client) 인스턴스 분리
- **절대 원칙:** Server Component / Server Actions용 클라이언트와 Client Component용 클라이언트를 엄격하게 분리하여 사용합니다.
- 서버 측 스크립트에서는 인증 상태를 포함하여 데이터를 주고받기 위해 서버 전용 인스턴스 생성을 사용합니다. (예: `@supabase/ssr` 패키지의 `createServerClient`)
- 클라이언트 측 코드에서는 브라우저 환경에서 사용하는 인스턴스를 사용합니다. (예: `createBrowserClient`)
- 생성된 인스턴스 초기화 코드는 인스턴스 관리를 용이하도록 `src/shared/api/supabase/` 하위에 위치시킵니다.

### 1-2. RLS(Row Level Security) 및 보안 원칙 준수
- 프로젝트 내 DB 통신 로직(주로 `infrastructure` 계층)의 기본 전제는 **Supabase의 RLS 정책이 완전히 작동하고 있다는 가정**하에 작성합니다.
- 프론트엔드 코드 내에서는 어드민(서비스키) 권한 등 인가되지 않은 데이터를 강제로 우회하여 가져오지 않습니다. (강력한 권한이 필요한 경우 별도의 서버 측 전용 API를 경유합니다.)

### 1-3. 타입 가이드라인 및 타입 제너레이터 활용
- Supabase에서 추출되는 스키마(Schema) 자동 생성 기능을 통해 획득한 TypeScript 타입(`database.types.ts`)을 원본 그대로 사용하기보다는, 클린 아키텍처의 **도메인 엔티티(Entity)** 영역에서 우리가 사용할 형태로 재정의(Mapping)하여 사용합니다.

### 1-4. 마이그레이션(Migrations)
- supabase/migrations 폴더에 위치
- 마이그레이션을 수정/삭제/생성할 때는 항상 사용자의 허가를 받아야 합니다.

---

## 2. 스타일링 및 UI 프레임워크 (Tailwind CSS)

### 2-1. 하드코딩 지양 및 디자인 시스템 활용
- Tailwind CSS 유틸리티 클래스를 남발하여 하드코딩하기보다는, 여러 번 쓰이거나 도메인에 종속되지 않은 공통 컴포넌트는 직관적으로 사용할 수 있게 `src/shared/ui/` 영역에 별도 캡슐화(Componentize)하여 사용합니다.
- 일관성 있는 색상, 여백, 폰트 옵션 등을 제공하기 위해 Tailwind의 `tailwind.config.ts` 를 적극 구성합니다.

### 2-2. 조건부 스타일링 관리 (clsx/tailwind-merge 등)
- 컴포넌트 스니펫 내부에서 복잡하거나 긴 조건부 연산이 필요한 클래스는 가독성을 저해합니다.
- `clsx` 또는 `tailwind-merge`와 같은 라이브러리 유틸리티를 사용하여, 상태나 프롭스에 따른 클래스 변화를 깨끗하게 결합합니다. (이때의 유틸리티 로직은 보통 `src/shared/lib/`에 `cn()` 함수 같은 형태로 감싸서 제공합니다.)

---

## 3. 폼 및 유효성 검사 (Forms & Validation)

### 3-1. Zod를 활용한 스키마 검증
- 타입의 안전한 데이터 수집과 폼 검증을 위해 클라이언트/서버 요청 모두 형태가 예측 가능해야 합니다.
- **모든 폼의 유효성 검증과 API 파라미터는 Zod 스키마를 통해 필수적으로 검증(Parse)**합니다.
- 선언된 Zod 스키마는 각 피처(Feature) 영역의 데이터 교환이 일어나는 `application/dtos/` 혹은 도메인 객체 부분에 묶어서 보관합니다.
