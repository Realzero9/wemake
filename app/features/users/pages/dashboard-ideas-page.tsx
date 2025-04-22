import type { Route } from "./+types/dashboard-ideas-page";
import { Hero } from "~/common/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Ideas | WeMake", description: "WeMake 내 아이디어 페이지입니다." }
  ];
}

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-20">
      <Hero title="My Ideas" subtitle="Manage your ideas" />
      <div className="grid grid-cols-3 gap-5">
        {[
          {
            title: "Doggie Social",
            stage: "MVP",
            applicants: 12,
            status: "Active",
          },
          {
            title: "Tech Blog Platform",
            stage: "Idea",
            applicants: 3,
            status: "Draft",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stage: {item.stage}
                  </p>
                </div>
                <Badge variant={item.status === "Active" ? "default" : "secondary"}>
                  {item.status}
                </Badge>
              </div>
              <CardContent className="p-0 mt-4">
                <p className="text-sm">
                  {item.applicants} applicants
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
} 