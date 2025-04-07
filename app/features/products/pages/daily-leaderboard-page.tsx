import type { Route } from "./+types/daily-leaderboard-page";
import { data, type MetaFunction } from "react-router";

export function loader({ params }: Route.LoaderArgs) {
  const { year, month, day } = params;
  return {
    title: `${year}년 ${month}월 ${day}일 리더보드`,
    description: `${year}년 ${month}월 ${day}일 제품 순위를 확인하세요.`,
    year,
    month,
    day,
  };
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {loaderData.year}년 {loaderData.month}월 {loaderData.day}일 리더보드
      </h1>
      <p className="text-lg text-gray-600">
        {loaderData.year}년 {loaderData.month}월 {loaderData.day}일 제품 순위를 확인하세요.
      </p>
    </div>
  );
} 