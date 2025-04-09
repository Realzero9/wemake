import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/yearly-leaderboard-page";
import { DateTime } from "luxon";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";

// 파라미터 검증
const paramsSchema = z.object({
  year: z.coerce.number(),
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
  const today = DateTime.now().setZone("Asia/Seoul").startOf("year");
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

export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });

  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  return (
    <div className="space-y-10">
      <Hero title={`Best of ${urlDate.toLocaleString({
        year: "numeric",
      })}`} />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({
                year: "numeric",
              })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({
                year: "numeric",
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
