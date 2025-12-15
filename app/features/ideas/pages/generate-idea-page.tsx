import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { insertIdeas } from "../mutation";
import { adminClient } from "~/supa-client";
import type { Route } from "./+types/generate-idea-page";
import { Form } from "react-router"; // Form 임포트
import { Button } from "~/common/components/ui/button"; // Button 임포트

// 환경변수에서 API 키를 불러옵니다.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const IdeaSchema = z.object({
  title: z.string(),
  description: z.string({
    description: "A short description of the idea. 100 characters max.",
  }),
  problem: z.string(),
  solution: z.string(),
  category: z.enum([
    "tech",
    "business",
    "health",
    "education",
    "finance",
    "other",
  ]),
});

const ResponseSchema = z.object({
  potato: z.array(IdeaSchema).length(10),
});

export const action = async ({request}: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  // const header = request.headers.get("X-POTATO"); // 임시 주석 처리
  // if (!header || header !== "X-TOMATO") { // 임시 주석 처리
  //   return new Response(null, { status: 404 }); // 임시 주석 처리
  // }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `
    혼자서 만들 수 있는 스타트업 아이디어 10개를 아래 JSON 형식으로만 반환해줘.
    {
      "potato": [
        {
          "title": "아이디어 제목",
          "description": "100자 이내의 짧은 설명",
          "problem": "해결하고자 하는 문제",
          "solution": "해결 방법",
          "category": "tech | business | health | education | finance | other"
        }
      ]
    }
    설명이나 다른 텍스트는 절대 포함하지 말고, JSON만 반환해줘.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text().trim();

  // 코드블록 제거
  if (text.startsWith("```json")) {
    text = text.replace(/^```json/, "").replace(/```$/, "").trim();
  } else if (text.startsWith("```")) {
    text = text.replace(/^```/, "").replace(/```$/, "").trim();
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      error: "AI 응답이 올바른 JSON이 아닙니다.",
      raw: text,
    };
  }

  const validated = ResponseSchema.safeParse(parsed);
  if (!validated.success) {
    return {
      error: "AI 응답이 스키마와 일치하지 않습니다.",
      details: validated.error,
    };
  }

  const descriptions = validated.data.potato.map((idea) => idea.description);

  if (!descriptions || descriptions.length === 0) {
    return Response.json(
    {
      error: "No ideas generated",
    },
    {
      status: 500,
    }
  );
  }
  // RLS 처리를 안해서 adminClient 사용
  await insertIdeas(adminClient, descriptions);

  return Response.json({ ok: true });
};

// 기본 UI 렌더링 함수 추가
export default function GenerateIdeaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">GPT 아이디어 생성</h1>
      <Form method="post" className="w-full max-w-sm">
        <Button type="submit" className="w-full">아이디어 10개 생성하기</Button>
      </Form>
    </div>
  );
}
