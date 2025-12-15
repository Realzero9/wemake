import { MessageCircleIcon } from "lucide-react";
import { Card, CardHeader } from "~/common/components/ui/card";
import { SidebarTrigger } from "~/common/components/ui/sidebar";
import type { Route } from "./+types/messages-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Messages | The NamYoon", description: "The NamYoon 메시지 페이지입니다." }
  ];
}

export default function MessagesPage() {
  return (
    <div className="h-full flex flex-col">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold">Messages</h1>
        </CardHeader>
      </Card>
      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <MessageCircleIcon className="size-12 text-muted-foreground" />
        <h1 className="text-xl text-muted-foreground font-semibold">
          Click on a message in the sidebar to view it.
        </h1>
      </div>
    </div>
  );
} 