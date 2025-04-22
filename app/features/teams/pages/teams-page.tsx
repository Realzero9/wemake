import type { Route } from "./+types/teams-page";
import { Hero } from "~/common/components/hero";
import { TeamCard } from "../components/team-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Teams | WeMake", description: "WeMake 팀 목록 페이지입니다." },
  ];
} 

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <Hero title="Teams" subtitle="Find a team looking for a new member" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCard
            key={`team-${index}`}
            id={`team-${index}`}
            username="lynn"
            userAvatar="https://github.com/inthetiger.png"
            lookingFor={["React Developer", "Backend Developer", "Product Developer"]}
            projectDescription="a new social media platform"
            />
        ))}
      </div>
    </div>
  );
}