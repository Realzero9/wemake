import type { Route } from "./+types/message-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Message Details | WeMake", description: "WeMake 메시지 상세 페이지입니다." }
  ];
}

export default function MessagePage() {
  return (
    <div className="space-y-20">
      <Hero title="Message Details" subtitle="View message details" />
    </div>
  );
} 