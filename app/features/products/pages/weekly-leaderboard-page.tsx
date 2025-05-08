import { DateTime } from "luxon";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import ProductPagination from "~/common/components/product-pagination";
import type { Route } from "./+types/weekly-leaderboard-page";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { PAGE_SIZE } from "../constants";
// 파라미터 검증
const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});

// 메타 데이터 : params(url파라미터) 및 loaderData(로더 데이터, 내부 api 호출 결과 등) 사용
export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  }).setZone("Asia/Seoul").setLocale("ko");
  return [
    { title: `Best of week ${date.startOf("week").toLocaleString(DateTime.DATE_SHORT)} - ${date.endOf("week").toLocaleString(DateTime.DATE_SHORT)}` },
  ];
};

// 로더
export const loader = async ({ params, request }: Route.LoaderArgs) => {
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
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
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
  const today = DateTime.now().setZone("Asia/Seoul").startOf("week");
  if (date > today) {
    throw data(
      {
      message: "Future date",
      error_code: "FUTURE_DATE",
      }, 
      { status: 400 }
    );
  }

  const url = new URL(request.url);
  const weeklyProducts = await getProductsByDateRange({
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page") || 1),
  });

  const totalPages = await getProductPagesByDateRange({
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
  });

  return {
    ...parsedData,
    weeklyProducts,
    totalPages,
  };
}

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    weekYear: loaderData.year,
    weekNumber: loaderData.week,
  });

  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("week"));
  return (
    <div className="space-y-10">
      <Hero title={`Best of week ${urlDate.startOf("week").toLocaleString(DateTime.DATE_SHORT)} - ${urlDate.endOf("week").toLocaleString(DateTime.DATE_SHORT)}`} />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/weekly/${previousWeek.weekYear}/${previousWeek.weekNumber}`}>
            &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/weekly/${nextWeek.weekYear}/${nextWeek.weekNumber}`}>
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        ) : null }
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        { loaderData.weeklyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
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
