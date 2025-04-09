import { z } from "zod";
import type { Route } from "./+types/monthly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { DateTime } from "luxon";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";

// 파라미터 검증
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
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
  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
  }).setZone("Asia/Seoul");
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
  const today = DateTime.now().setZone("Asia/Seoul").startOf("month");
  if (date > today) {
    throw data(
      {
      message: "Future date",
      error_code: "FUTURE_DATE",
      }, 
      { status: 400 }
    );
  }
  return {
    ...parsedData,
  };
}

export default function MonthlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });

  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("month"));
  return (
    <div className="space-y-10">
      <Hero title={`Best of ${urlDate.toLocaleString({
        month: "long",
        year: "2-digit",
      })}`} />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}>
            &larr; {previousMonth.toLocaleString({
                month: "long",
                year: "2-digit",
              })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}>
              {nextMonth.toLocaleString({
                month: "long",
                year: "2-digit",
              })} &rarr;
            </Link>
          </Button>
        ) : null }
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        { Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`product-${index}`}
            id={`product-${index}`}
            name="Product Name"
            description="Product Description"
            commentCount={100}
            viewCount={100}
            upvoteCount={100}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
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
