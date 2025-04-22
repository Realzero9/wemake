import type { Route } from "./+types/dashboard-page";
import { Hero } from "~/common/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Dashboard | WeMake", description: "WeMake 대시보드 페이지입니다." }
  ];
}

export default function DashboardPage() {
  return (
    <div className="space-y-20">
      <Hero title="Dashboard" subtitle="Welcome back!" />
      <div className="grid grid-cols-4 gap-5">
        {[
          {
            title: "Total Projects",
            value: "12",
          },
          {
            title: "Active Applications",
            value: "5",
          },
          {
            title: "Messages",
            value: "24",
          },
          {
            title: "Notifications",
            value: "3",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                <p>{item.value}</p>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
} 