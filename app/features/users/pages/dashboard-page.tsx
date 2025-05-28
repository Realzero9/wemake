import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import type { Route } from "./+types/dashboard-page";
import { ChartContainer, ChartTooltip, type ChartConfig } from "~/common/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { getLoggedInUserId } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Dashboard | WeMake", description: "WeMake 대시보드 페이지입니다." }
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { data, error } = await client.rpc("get_dashboard_stats", {
    user_id: userId
  });
  if (error) {
    throw error;
  }
  return { chartData : data };
}

const chartConfig = {
  views: {
    label: "👁️",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile views</CardTitle>
        </CardHeader>
        <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="views"
              type="natural"
              stroke="var(--color-views)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
} 