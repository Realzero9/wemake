import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";

// 파라미터 검증
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

// 로더
export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
      error_code: "INVALID_PARAMS",
      message: "Invalid params",
      },
      { status: 400 }
    );
  }

  const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");
  // 날짜 검증
  if (!date.isValid) {
    throw data(
      {
      message: "Invalid date", 
      error_code: "INVALID_DATE",
      }, 
      { status: 400 }
    );
  }
  // 오늘 날짜 체크
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
  if (date > today) {
    throw data(
      {
      message: "Future date",
      error_code: "FUTURE_DATE",
      }, 
      { status: 400 }
    );
  }
  return { date };
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {loaderData.date.year}년 {loaderData.date.month}월 {loaderData.date.day}일 리더보드
      </h1>
      <p className="text-lg text-gray-600">
        {loaderData.date.year}년 {loaderData.date.month}월 {loaderData.date.day}일 제품 순위를 확인하세요.
      </p>
    </div>
  );
}

// 에러 경계 (Optional - 매 페이지에 작성 가능하지만 안하면 root에서 캐치함)
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
