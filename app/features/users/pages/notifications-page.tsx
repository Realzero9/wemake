import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getNotifications } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Notifications | The NamYoon", description: "The NamYoon 알림 페이지입니다." }
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, { userId: userId });
  console.log(notifications);
  return { notifications };
}

export default function NotificationsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        {loaderData.notifications.map((notification) => (
          <NotificationCard
            id={notification.notification_id}
            key={notification.notification_id}
            avatarUrl={notification.source?.avatar ?? ""}
            avatarFallback={notification.source?.name?.[0] ?? ""}
            username={notification.source?.name ?? ""}
            type={notification.type}
            productName={notification.product?.name ?? ""}
            postTitle={notification.post?.title ?? ""}
            payloadId={notification.product?.product_id?.toString() ?? notification.post?.post_id?.toString() ?? ""}
            timestamp={DateTime.fromISO(notification.created_at, { zone: 'utc' }).setZone('Asia/Seoul').toRelative()!}
            seen={notification.seen}
          />
        ))}
      </div>
    </div>
  );
} 