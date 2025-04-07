import { Route } from "react-router";

export function loader({ request }: Route.ComponentProps) {
  return {
    title: "리더보드",
    description: "제품 순위를 확인하세요.",
  };
}

export function action({ request }: Route.ComponentProps) {
  return {
    status: 200,
  };
}

export function meta({ data }: Route.ComponentProps) {
  return {
    title: data.title,
    description: data.description,
  };
}

export default function LeaderboardPage({ loaderData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">리더보드</h1>
      <p className="text-lg text-gray-600">
        제품 순위를 확인하세요.
      </p>
    </div>
  );
} 