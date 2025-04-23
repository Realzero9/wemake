import type { Route } from "./+types/dashboard-ideas-page";
import { Hero } from "~/common/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { IdeaCard } from "~/features/ideas/components/idea-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Ideas | WeMake", description: "WeMake 내 아이디어 페이지입니다." }
  ];
}

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-5">
        { Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`idea-${index}`}
            id={`idea-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and traking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewCount={123}
            timeAgo="12 hours ago"
            likeCount={12}
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
} 