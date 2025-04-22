import type { Route } from "./+types/notifications-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Notifications | WeMake", description: "WeMake 알림 페이지입니다." }
  ];
}

export default function NotificationsPage() {
  return (
    <div className="space-y-20">
      <Hero title="Notifications" subtitle="Manage your notifications" />
    </div>
  );
} 