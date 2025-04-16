import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";

export const meta = () => {
  return [
    { title: "IdeasGPT | wemake" },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export default function IdeaPage() {
  return (
    <div>
        <Hero title="Idea #1212" />
        <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
            <p className="italic text-center">"A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and traking of progress using a mobile app to track workouts and progress as well as a website to manage the business."</p>
            <div className="flex items-center text-sm">
                <div className="flex items-center gap-1">
                    <EyeIcon className="size-4" />
                    <span>123</span>
                </div>
                <DotIcon className="size-4" />
                <span>12 hours ago</span>
                <DotIcon className="size-4" />
                <Button variant="outline">
                    <HeartIcon className="size-4" />
                    <span>12</span>
                </Button>
            </div>
            <Button size="lg">Claim idea now &rarr;</Button>
        </div>
    </div>
  );
} 