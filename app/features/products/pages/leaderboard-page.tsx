import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Link } from "react-router";
import { getProductsByDateRange } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboard | wemake" },
    { name: "description", content: "Top products leaderboard" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("week"),
      endDate: DateTime.now().endOf("week"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("month"),
      endDate: DateTime.now().endOf("month"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("year"),
      endDate: DateTime.now().endOf("year"),
      limit: 7,
    })
  ]);

  return {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
    headers,
  };
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero 
        title="Leaderboard"
        subtitle="The most popular products on wemake"
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboards</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by day.</p>
        </div>
          { loaderData.dailyProducts
            .map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/daily">View All Leaderboards &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Weekly Leaderboards</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by week.</p>
        </div>
          { loaderData.weeklyProducts
            .map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/weekly">View All Leaderboards &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Monthly Leaderboards</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by month.</p>
        </div>
          { loaderData.monthlyProducts
            .map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/monthly">View All Leaderboards &rarr;</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Yearly Leaderboards</h2>
          <p className="text-xl font-light text-foreground">The most popular products on wemake by year.</p>
        </div>
          { loaderData.yearlyProducts
            .map((product) => (
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
        <Button variant="link" asChild className="text-lg self-center">
          <Link to="/products/leaderboards/yearly">View All Leaderboards &rarr;</Link>
        </Button>
      </div>
    </div>
  );
} 