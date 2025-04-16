import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";

export const meta : Route.MetaFunction = () => [
  { title: "IdeasGPT | wemake" },
  { name: "description", content: "Find ideas for your next project" },
];

export default function IdeasPage() {
  return (
    <div className="space-y-20">
        <Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
        <div className="grid grid-cols-4 gap-4">
            { Array.from({ length: 11 }).map((_, index) => (
            <IdeaCard
                key={`idea-${index}`}
                id={`idea-${index}`}
                title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and traking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
                viewCount={123}
                timeAgo="12 hours ago"
                likeCount={12}
                claimed={index % 2 === 0}
            />
            ))}
        </div>
    </div>
  );
} 