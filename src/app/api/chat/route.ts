import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = 'http://143.198.212.141:8000/ask';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 백엔드 API로 프록시 요청
    const backendRes = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: message }),
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return NextResponse.json({ error: errorData.detail || 'Backend API error' }, { status: 502 });
    }

    const data = await backendRes.json();

    // 응답 형식에 따라 answer 필드 반환
    return NextResponse.json({ answer: data.answer || data.response || data.result || '' });

  } catch (error) {
    console.error('[API Error]', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}
