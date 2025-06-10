import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import { MessageBubble } from "../components/messages-bubble";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getMessagesByRoomId, getRoomsParticipant } from "../queries";
import { useOutletContext } from "react-router";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Message Details | WeMake", description: "WeMake 메시지 상세 페이지입니다." }
  ];
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByRoomId(client, { messageRoomId: params.messageRoomId as string, userId });
  const participant = await getRoomsParticipant(client, { messageRoomId: params.messageRoomId as string, userId });
  return { messages, participant };
}

export default function MessagePage({ loaderData }: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  const lastMessage = loaderData.messages[loaderData.messages.length - 1];
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback>{loaderData.participant?.profile?.name.charAt(0) ?? "CN"}</AvatarFallback>
            <AvatarImage src={loaderData.participant?.profile?.avatar ?? undefined} />
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>{loaderData.participant?.profile?.name}</CardTitle>
            <CardDescription>{DateTime.fromISO(lastMessage.created_at).toRelative()}</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
        {loaderData.messages.map((message) => (
          <MessageBubble 
            key={message.message_id}
            avatarUrl={message.sender?.avatar}
            avatarFallback={message.sender?.name.charAt(0) ?? ""}
            content={message.content}
            isCurrentUser={message.sender?.profile_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea placeholder="Write a message..." rows={2} className="resize-none" />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
} 