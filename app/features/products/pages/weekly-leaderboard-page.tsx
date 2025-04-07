import type { Route } from "./+types/weekly-leaderboard-page";

export function loader({ params }: Route.LoaderArgs) {
  const { year, week } = params;
  return {
    title: `${year}년 ${week}주차 리더보드`, 
    description: `${year}년 ${week}주차 제품 순위를 확인하세요.`,
    year,
    week,
  };
}

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        {loaderData.year}년 {loaderData.week}주차 리더보드
      </h1>
      <p className="text-lg text-gray-600">
        {loaderData.year}년 {loaderData.week}주차 제품 순위를 확인하세요.
      </p>
    </div>
  );
} 