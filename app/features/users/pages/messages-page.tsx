import type { Route } from "./+types/messages-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Messages | WeMake", description: "WeMake 메시지 페이지입니다." }
  ];
}

export default function MessagesPage() {
  return (
    <div className="space-y-20">
      <Hero title="Messages" subtitle="Manage your messages" />
    </div>
  );
} 