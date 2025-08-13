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

## 디자인 
- **Primary**: `#eb8401` (프렌치토스트 오렌지)
- **Primary Light**: `#ffa726`
- **Primary Dark**: `#d97502`
- **Background**: `#f9fafb` (회색 계열)
- **Text**: `#111827` (진한 회색)

## Backend와 연결하기

DigitalOcean 앱 서버(백엔드 API 서버): 143.198.212.141	
DigitalOcean DB 서버(벡터 DB 서버): 165.22.105.79

### **API 기본 정보**

- **메인 서버 주소 (Host):** `http://143.198.212.141:8000`
- **메인 엔드포인트 (Endpoint):** `/ask`
- **HTTP 메소드:** `POST`

### **요청 (Request) 형식**

`Content-Type`은 `application/json`으로 보내야 하며, `body`는 아래와 같은 형식입니다.
```
{
  "question": "사용자가 입력한 질문 텍스트"
}
```

### **응답 (Response) 형식**
성공 시 `200 OK` 상태 코드와 함께 아래 형식의 JSON을 반환합니다.

### API 테스트 명령어
```
curl -X POST "http://143.198.212.141:8000/ask" \
-H "Content-Type: application/json" \
-d '{"question": "캠핑고래 합병된 적 있어?"}'
```