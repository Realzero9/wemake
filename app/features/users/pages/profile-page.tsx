import type { Route } from "./+types/profile-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Profile | WeMake", description: "WeMake 사용자 프로필 페이지입니다." }
  ];
}

export default function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a product designer based on UK, I like doing product design, design systems and design tokens.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm a product designer based on UK, I like doing product design, design systems and design tokens.
        </p>
      </div>
    </div>
  );
}