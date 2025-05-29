import { Area, AreaChart } from "recharts";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-product-page";
import { ChartContainer, ChartTooltip, type ChartConfig } from "~/common/components/ui/chart";
import { CartesianGrid, XAxis } from "recharts";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { redirect } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Dashboard | WeMake", description: "WeMake 제품 대시보드 페이지입니다." }
  ];
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { error } = await client.from("products").select("product_id").eq("profile_id", userId).eq("product_id", Number(params.productId)).single();
  if (error) {
    throw redirect("/my/dashboard/products");
  }
  const { data, error: rpcError } = await client.rpc("get_product_stats", { product_id: params.productId });
  if (rpcError) {
    throw rpcError;
  }
  return {
    chartData: data,
  };
}

const chartConfig = {
  views: {
    label: "Page Views",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function DashboardProductPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={loaderData.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 15, right: 15 }}
            />
            <ChartTooltip
              cursor={false}
              wrapperStyle={{ minWidth: "200px" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="product_views"
              type="natural"
              fill="var(--color-views)"
              stroke="var(--color-views)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="product_visit"
              type="natural"
              fill="var(--color-visitors)"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
} 