import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import * as fs from "fs/promises";
import * as path from "path";

// Gemini 모델 초기화
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0.7,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "embedding-001",
});

// testdata.txt 파일 경로 설정
const filePath = path.join(process.cwd(), 'testdata.txt');

async function getVectorStore() {
    // 1. testdata.txt 파일 로드
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 100,
    });
    const docs = await textSplitter.createDocuments([fileContent]);

    // 2. 메모리 벡터 저장소 생성
    return await MemoryVectorStore.fromDocuments(docs, embeddings);
}

// POST 요청 처리
export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const vectorStore = await getVectorStore();
        const retriever = vectorStore.asRetriever({ k: 4 });

        // 1. History-Aware Retriever 설정 (대화 기록 고려)
        const historyAwarePrompt = ChatPromptTemplate.fromMessages([
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
            [
                "user",
                "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
            ],
        ]);

        const historyAwareRetrieverChain = await createHistoryAwareRetriever({
            llm,
            retriever,
            rephrasePrompt: historyAwarePrompt,
        });

        // 2. 답변 생성 체인 설정
        const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                "Answer the user's questions based on the below context. Format your answer in GitHub-flavored markdown for readability. Do not use HTML tags.:\n\n{context}",
            ],
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
        ]);

        const documentChain = await createStuffDocumentsChain({
            llm,
            prompt: questionAnsweringPrompt,
        });

        // 3. 최종 Retrieval 체인 결합
        const conversationalRetrievalChain = await createRetrievalChain({
            retriever: historyAwareRetrieverChain,
            combineDocsChain: documentChain,
        });

        // 4. 체인 실행
        const chatHistory = (history || []).map((msg: { role: string; parts: string }) => 
            msg.role === 'user' ? new HumanMessage(msg.parts) : new AIMessage(msg.parts)
        );

        const result = await conversationalRetrievalChain.invoke({
            chat_history: chatHistory,
            input: message,
        });

        return NextResponse.json({ answer: result.answer });

    } catch (error) {
        console.error('[API Error]', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
    }
}
