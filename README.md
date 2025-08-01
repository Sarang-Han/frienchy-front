# Frienchy Front - RAG 기반 챗봇 프론트엔드

공공데이터 API를 활용한 RAG(Retrieval-Augmented Generation) 기반 챗봇의 프론트엔드 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **Development**: ESLint, Turbopack

## 📱 프로젝트 특징

- **모바일 우선 디자인**: 모바일 앱 비율(414px)로 고정된 UI
- **웹뷰 호환성**: 네이티브 앱 웹뷰에서 사용 예정
- **FastAPI 백엔드 연동**: AI 서비스와 REST API 통신
- **실시간 채팅**: 사용자 친화적인 챗봇 인터페이스

## 🛠️ 개발 환경 설정

개발 서버를 시작하려면:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 결과를 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── globals.css      # 글로벌 스타일 (모바일 컨테이너 포함)
│   ├── layout.tsx       # 루트 레이아웃
│   └── page.tsx         # 메인 페이지
├── components/
│   └── ChatInterface.tsx # 챗봇 인터페이스 컴포넌트
└── ...
```

## 🎨 UI/UX 가이드라인

- **모바일 컨테이너**: 최대 너비 414px로 제한
- **안전 영역**: iOS 상태바/하단 버튼 영역 고려
- **다크 모드**: 시스템 설정에 따른 자동 테마 전환
- **반응형**: 모바일 우선, 데스크톱 호환

## 🔗 백엔드 연동

FastAPI 백엔드와의 연동을 위한 설정:

```typescript
// TODO: 환경 변수 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

## 📝 개발 가이드

1. **컴포넌트 개발**: Headless UI 우선 사용
2. **타입 안정성**: TypeScript 엄격 모드 적용
3. **스타일링**: Tailwind CSS 유틸리티 클래스 활용
4. **상태 관리**: React Hooks 기반 로컬 상태 관리

## 🚀 배포

Vercel을 통한 간편 배포:

```bash
npm run build
```

자세한 배포 방법은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참조하세요.
