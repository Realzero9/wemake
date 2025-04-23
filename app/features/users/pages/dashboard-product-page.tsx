import { Area, AreaChart } from "recharts";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-product-page";
import { ChartContainer, ChartTooltip, type ChartConfig } from "~/common/components/ui/chart";
import { CartesianGrid, XAxis } from "recharts";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Dashboard | WeMake", description: "WeMake 제품 대시보드 페이지입니다." }
  ];
}

const chartData = [
  { month: "January", views: 186, visitors: 100 },
   { month: "February", views: 305, visitors: 34 },
   { month: "March", views: 237, visitors: 65 },
   { month: "April", views: 73, visitors: 32 },
   { month: "May", views: 209, visitors: 66 },
   { month: "June", views: 214, visitors: 434 },
]
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

export default function DashboardProductPage() {
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
            data={chartData}
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              wrapperStyle={{ minWidth: "200px" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="views"
              type="natural"
              fill="var(--color-views)"
              stroke="var(--color-views)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="visitors"
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