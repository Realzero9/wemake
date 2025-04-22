import type { Route } from "./+types/profile-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Profile | WeMake", description: "WeMake 사용자 프로필 페이지입니다." }
  ];
}

export default function ProfilePage() {
  return (
    <div className="space-y-20">
      <Hero title="User Profile" subtitle="View user profile" />
    </div>
  );
}