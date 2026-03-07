---
trigger: always_on
---

# 🏗️ E-Commerce Dashboard Clean Architecture Rules

본 문서는 이커머스 대시보드 프로젝트(Next.js App Router 기반)의 유지보수성과 확장성을 극대화하기 위한 Feature-Sliced Design 기반의 클린 아키텍처 규칙과 폴더 구조를 정의합니다.

## 0. 핵심 원칙 (Core Principles)
1. **Feature-First (기능 위주 분할):** 코드는 기술적 역할(Layer)이 아닌 기능(Feature/Domain) 단위로 먼저 묶여야 합니다. (예: `src/features/product`)
2. **단방향 의존성 (The Dependency Rule):** 의존성은 항상 바깥쪽(Framework, DB, UI)에서 안쪽(Domain, UseCase)으로만 향해야 합니다. 내부 계층은 외부 계층의 코드를 절대 `import` 해서는 안 됩니다.
3. **격리와 독립성:** 도메인 로직과 유즈케이스 로직은 React, Next.js, 브라우저 API(window, document), HTTP 클라이언트(axios, fetch)에 의존하지 않는 순수한 TypeScript로 작성되어야 합니다.

## 1. 폴더 구조 (Folder Structure)

프로젝트는 프레임워크 환경(`app/`)과 핵심 비즈니스 로직(`src/`)을 완벽하게 분리합니다.

```text
e-commerce-dashboard/
├── app/                        # [UI Entry] Next.js App Router (페이지 및 API 엔드포인트)
│   ├── (auth)/login/page.tsx   # 라우팅 및 페이지 진입점
│   ├── products/page.tsx       # UI 컴포넌트 조합 및 Use Case 호출 (Server Component)
│   ├── layout.tsx, globals.css # 글로벌 레이아웃, 스타일
│   └── api/                    # Route Handlers (Next.js를 백엔드로 쓸 경우)
│
├── src/
│   ├── features/               # [Feature] 도메인별 응집된 모듈
│   │   └── product/            # 예시: 상품(Product) 도메인
│   │       ├── domain/         #   [순수 로직] 비즈니스 규칙
│   │       │   ├── entities/   #     Product, ProductOption 등 프론트엔드 기준 순수 객체
│   │       │   ├── errors/     #     ProductNotFoundError 등 도메인 특화 에러
│   │       │   └── product.repository.ts # Repository 인터페이스 (계약)
│   │       │
│   │       ├── application/    #   [유즈케이스]
│   │       │   ├── use-cases/  #     get-products.usecase.ts, update-price.usecase.ts
│   │       │   └── dtos/       #     UseCase의 Input/Output 스펙 (예: UpdateProductCommand)
│   │       │
│   │       ├── infrastructure/ #   [외부 연동] API 통신 및 DB 구현체
│   │       │   ├── product.api.ts      # 실제 데이터 Fetch 로직 (axios/supabase 호출)
│   │       │   ├── product.dto.ts      # 외부 API의 응답/요청 스펙 (예: ProductResponseDto)
│   │       │   └── product.mapper.ts   # [핵심] API DTO <-> Domain Entity 변환기
│   │       │
│   │       ├── presentation/   #   [UI 컴포넌트 & 상태]
│   │       │   ├── components/ #     ProductForm, ProductTable 등 도메인 종속 UI
│   │       │   └── hooks/      #     useProductQuery, useUpdateProduct 등 도메인 종속 상태/훅
│   │       │
│   │       └── __tests__/      #   해당 도메인의 단위 테스트 (Jest/Vitest)
│   │           ├── get-products.usecase.spec.ts
│   │           └── product.mapper.spec.ts
│   │
│   ├── shared/                 # [공통 모듈] 모든 Feature에서 참조 가능한 전역 요소
│   │   ├── api/                #   공통 HTTP 클라이언트 (Supabase 인스턴스, Axios 인터셉터 등)
│   │   ├── errors/             #   전역 에러 객체 (ApiError, UnauthorizedError, NetworkError 등)
│   │   ├── ui/                 #   어드민 전용 디자인 시스템 (Table, Modal, Button 등)
│   │   ├── lib/                #   날짜 포맷팅, 통화 포맷팅 등 순수 유틸리티
│   │   └── types/              #   PaginationResponse, BaseEntity 등 공통 타입
│   │
│   └── mocks/                  # [개발/테스트용] MSW 핸들러 및 더미 데이터 (배포 시 제외)
│       ├── handlers.ts
│       └── data/
```

## 2. 계층별 역할 체계 (Layers & Responsibilities)

프로젝트는 크게 `app/`(프레임워크), `src/features/`(도메인 로직), `src/shared/`(공통 모듈), `src/mocks/`(모킹 데이터) 4가지로 분류합니다.

### 2-1. Framework Layer (`app/`)
- **역할:** Next.js App Router의 진입점.
- **Rule 1:** 비즈니스 로직을 직접 구현하지 않습니다.
- **Rule 2:** `page.tsx`, `layout.tsx`는 UI 구성 컴포넌트를 정의하거나 호출하고, 서버용 유즈케이스와 연결(Composition Root)하는 역할만 수행합니다.

### 2-2. Feature Layer (`src/features/{feature-name}/`)
각 도메인(예: product, order)은 아래의 4가지 계층을 반드시 지켜 구성합니다.

#### 🟢 Domain Layer (`domain/`) - 가장 내부 계층
- **역할:** 비즈니스 핵심 규칙, 엔티티, 도메인 에러 정의.
- **Rule 1:** 외부 라이브러리 `import` 절대 금지.
- **Rule 2:** 데이터 통신을 위한 Repository는 `interface` 형태로 규격만 정의합니다.
- **Rule 3:** 도메인 특화 에러(예: `ProductNotFoundError`)를 `errors/` 폴더에 별도로 정의합니다.

#### 🔵 Application Layer (`application/`)
- **역할:** 사용자의 흐름(Use Case) 및 비즈니스 시나리오 구현.
- **Rule 1:** 도메인 계층(Entity, Repository Interface, 도메인 에러)에만 의존해야 합니다.
- **Rule 2:** 각 행위는 개별 유즈케이스 파일로 분리합니다. (예: `get-products.usecase.ts`)
- **Rule 3:** DTO(Data Transfer Object)가 필요하다면 `dtos/`에 UseCase 레이어 전용 입출력 타입을 명시합니다.

#### 🟡 Infrastructure Layer (`infrastructure/`) - 외부 계층
- **역할:** 비즈니스 로직 밖의 세상(API, DB 연동 등 기술 구현체)과의 통신.
- **Rule 1:** Domain 계층에서 정의한 Repository `interface`를 실제로 구현(`implements`)합니다.
- **Rule 2 [중요]:** 백엔드 API 응답 데이터(외부 DTO)와 프론트엔드 도메인 모델(Entity)의 결합도를 낮추기 위해 **Mapper**(`{feature}.mapper.ts`)를 도입하여 데이터를 상호 변환합니다.

#### 🟣 Presentation Layer (`presentation/`) - 외부 계층
- **역할:** UI 렌더링(React 컴포넌트) 및 프론트 상태 관리(Hooks 등).
- **Rule 1:** 해당 도메인(Feature)에서만 종속적으로 쓰이는 컴포넌트(`components/`)와 커스텀 훅(`hooks/`)만 담당합니다.
- **Rule 2:** 다른 도메인이나 공통으로 쓰이는 UI 컴포넌트라면 설계 원칙에 따라 `src/shared/ui/`로 이동시킵니다.

### 2-3. Shared Layer (`src/shared/`)
- **역할:** 둘 이상의 Feature 계층이나 전체 앱에서 공유하는 전역 모듈.
- **Rule 1 (`api/`):** 전역 HTTP 클라이언트(Axios, Fetch 공통 설정), Supabase 인스턴스, 인증 처리 관련.
- **Rule 2 (`errors/`):** 전역 레벨의 범용 에러 타입 정의(`AuthError`, `NetworkError` 등).
- **Rule 3 (`ui/`):** 도메인 지식 없는 범용 공통 UI 컴포넌트 (Design System).
- **Rule 4 (`lib/`, `types/`):** 범용 유틸리티 및 보편적인 타입 정의.

### 2-4. Testing & Mocks (`src/mocks/`, `__tests__/`)
- **Rule 1:** 개발 단계에서 필요한 프론트엔드 목(Mock) 데이터 및 MSW 설정은 프로덕션 런타임 코드와 섞이지 않도록 최상단 `src/mocks/`에 모아 관리합니다.
- **Rule 2:** 유즈케이스 검증, 메퍼 로직 변환 검증 등 순수 비즈니스 로직을 검증하는 단위 테스트 코드는 해당 모듈이 위치한 폴더 혹은 `__tests__/`에 적극적으로 작성합니다.

## 3. 네이밍 컨벤션 (Naming Conventions)
- **단일 원칙:** 가급적 하나의 파일에는 하나의 클래스나 함수(혹은 인터페이스)만 두는 것을 권장합니다.
- **명시적 접미사 (Suffix):** 파일명만 보고도 어느 계층의 어떤 역할을 하는지 파악할 수 있도록 접미사를 강제합니다.
  - Entity: `{name}.entity.ts` (예: `product.entity.ts`)
  - Error: `{name}.error.ts` (예: `product.error.ts`)
  - UseCase: `{name}.usecase.ts` (예: `get-products.usecase.ts`)
  - Repository (Interface): `{name}.repository.ts` (예: `product.repository.ts`)
  - Repository (Implementation): `{tool}-{name}.repository.ts` 또는 `{name}.api.ts` (예: `supabase-product.repository.ts`)
  - Mapper: `{name}.mapper.ts` (예: `product.mapper.ts`)
  - DTO: `{name}.dto.ts` (예: `product.dto.ts`)
