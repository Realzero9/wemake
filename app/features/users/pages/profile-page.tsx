import { useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Profile | WeMake", description: "WeMake 사용자 프로필 페이지입니다." }
  ];
}

export default function ProfilePage() {
  const { headline, bio } = useOutletContext<{ headline: string, bio: string }>();
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">{headline}</p>
      </div>
      <div>
        <h4 className="text-lg font-bold">Bio</h4>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}