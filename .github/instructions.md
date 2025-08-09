<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Frienchy Front - 프랜차이즈 창업 AI 상담 플랫폼

## 프로젝트 개요
**Frienchy (Frien-chy)**는 프랜차이즈 창업을 처음 고민하는 이들을 위한 공공데이터 기반 RAG AI 상담 플랫폼의 프론트엔드입니다.

## 핵심 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (엄격 모드)
- **Styling**: Tailwind CSS 4
- **UI Components**: Headless UI (@headlessui/react)
- **Icons**: Heroicons (@heroicons/react)
- **HTTP Client**: Axios
- **Development**: Turbopack, ESLint

## 디자인 시스템

### 브랜드 컬러
- **Primary**: `#eb8401` (프렌치토스트 오렌지)
- **Primary Light**: `#ffa726`
- **Primary Dark**: `#d97502`
- **Background**: `#f9fafb` (회색 계열)
- **Text**: `#111827` (진한 회색)

### 디자인 철학
- **모던 & 미니멀**: 현대카드, 토스 앱 스타일의 깔끔한 UI
- **모바일 우선**: 414px 고정폭 모바일 앱 비율
- **사용자 친화적**: 직관적이고 접근하기 쉬운 인터페이스
- **웹뷰 최적화**: 네이티브 앱 웹뷰 환경에 최적화

## 개발 가이드라인

### 컴포넌트 개발
1. **함수형 컴포넌트** 사용 (`function` 키워드 선호)
2. **Headless UI** 컴포넌트 우선 활용
3. **타입스크립트 인터페이스** 명시적 정의
4. **재사용 가능한 컴포넌트** 지향

### 스타일링 규칙
1. **Tailwind CSS** 유틸리티 클래스 우선 사용
2. **커스텀 CSS** 최소화 (globals.css에 정의된 변수 활용)
3. **반응형 디자인**: 모바일 우선 (`sm:`, `md:`, `lg:` 브레이크포인트)
4. **다크모드**: 시스템 설정 따름 (추후 토글 기능 추가 예정)

### 상태 관리
1. **React Hooks** 기반 로컬 상태 관리
2. **useState, useEffect, useRef** 적극 활용
3. **전역 상태**: 필요시 Context API 사용
4. **서버 상태**: React Query 도입 예정

### API 통신
1. **Axios** 사용하여 FastAPI 백엔드 연동
2. **환경변수**로 API 엔드포인트 관리
3. **에러 핸들링** 필수 구현
4. **로딩 상태** 사용자 피드백 제공

## 프로젝트 구조

```
src/
├── app/
│   ├── globals.css      # 글로벌 스타일 및 CSS 변수
│   ├── layout.tsx       # 루트 레이아웃
│   └── page.tsx         # 메인 채팅 페이지
├── components/
│   ├── ChatInterface.tsx    # 메인 챗봇 인터페이스
│   ├── ui/                  # 재사용 가능한 UI 컴포넌트
│   └── modals/              # 모달 컴포넌트들
├── types/
│   └── index.ts             # TypeScript 타입 정의
├── utils/
│   └── api.ts               # API 유틸리티 함수
└── hooks/
    └── useChat.ts           # 채팅 관련 커스텀 훅
```

## UI/UX 특징

### 메인 화면 구성
1. **프로필 영역**: 브랜드 아이콘(🍞) + 사용자 인사말
2. **안내 메시지**: "무엇을 도와드릴까요?" + 설명 텍스트
3. **빠른 키워드**: 자주 묻는 질문 버튼들
4. **도움말 버튼**: "! 챗봇 이렇게 써보세요" 기능
5. **입력창**: 하단 고정, 전송 버튼과 정렬

### 대화 인터페이스
1. **사용자 메시지**: 오렌지 배경 (`#eb8401`)
2. **봇 메시지**: 흰색 배경 + 테두리
3. **로딩 애니메이션**: 오렌지 점 3개 bounce 효과
4. **타임스탬프**: 메시지 하단 작은 텍스트

### 모달 & 인터랙션
1. **팁 모달**: 하단에서 올라오는 바텀 시트 스타일
2. **카테고리별 키워드**: 격자 레이아웃으로 정리
3. **호버 효과**: 부드러운 트랜지션 (`transition-colors`)
4. **포커스 상태**: 접근성을 위한 아웃라인 제공

## 코딩 컨벤션

### 네이밍
- **컴포넌트**: PascalCase (`ChatInterface`)
- **함수/변수**: camelCase (`sendMessage`)
- **상수**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS 클래스**: kebab-case (Tailwind 기본)

### 파일 구조
- **컴포넌트 파일**: `.tsx` 확장자
- **타입 정의**: `interface` 키워드 사용
- **유틸리티**: `utils/` 디렉토리에 분류
- **훅**: `hooks/` 디렉토리에 `use` 접두사

### 주석 & 문서화
- **TODO 주석**: 백엔드 연동 등 미완성 기능 표시
- **JSDoc**: 복잡한 함수에 대한 설명
- **타입 주석**: 복잡한 타입에 대한 설명

## 성능 최적화
1. **이미지 최적화**: Next.js Image 컴포넌트 사용
2. **코드 스플리팅**: 동적 import 활용
3. **메모이제이션**: React.memo, useMemo, useCallback
4. **번들 크기**: 불필요한 라이브러리 제거

## 접근성 (A11y)
1. **키보드 내비게이션**: Tab, Enter 키 지원
2. **스크린 리더**: aria-label, role 속성 활용
3. **컬러 대비**: WCAG 2.1 AA 준수
4. **포커스 표시**: 명확한 포커스 아웃라인

## 배포 & 환경
- **개발 환경**: `npm run dev` (Turbopack 사용)
- **빌드**: `npm run build`
- **배포**: Vercel 플랫폼 권장
- **환경 변수**: `.env.local`에 API 설정
