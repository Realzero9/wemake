import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Form, type ShouldRevalidateFunctionArgs } from "react-router";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import { MessageBubble } from "../components/messages-bubble";
import { browserClient, makeSSRClient, type Database } from "~/supa-client";
import { getLoggedInUserId, getMessagesByRoomId, getRoomsParticipant, sendMessageToRoom } from "../queries";
import { useOutletContext } from "react-router";
import { DateTime } from "luxon";
import { use, useEffect, useRef, useState } from "react";
import { SidebarTrigger } from "~/common/components/ui/sidebar";

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

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const message = formData.get("message") as string;
  await sendMessageToRoom(client, {
    messageRoomId: params.messageRoomId as string,
    userId,
    message,
  });
  return {
    ok: true,
  }
}

export default function MessagePage({ loaderData, actionData }: Route.ComponentProps) {
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, name, avatar } = useOutletContext<{ userId: string, name: string, avatar: string }>();
  const lastMessage = loaderData.messages[loaderData.messages.length - 1];
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData]);
  useEffect(() => {
    const change = browserClient.channel(
        `room:${userId}-${loaderData.participant?.profile.profile_id}`
      ).on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        }, 
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Database["public"]["Tables"]["messages"]["Row"]]);
        }
      ).subscribe();
    return () => {
      change.unsubscribe();
    }
  }, []);
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <Avatar className="size-10">
              <AvatarFallback>{loaderData.participant?.profile?.name.charAt(0) ?? "CN"}</AvatarFallback>
              <AvatarImage src={loaderData.participant?.profile?.avatar ?? undefined} />
            </Avatar>
            <div className="flex flex-col gap-0">
              <CardTitle className="text-base">{loaderData.participant?.profile?.name}</CardTitle>
              <CardDescription className="text-xs">{DateTime.fromISO(lastMessage.created_at).toRelative()}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full px-4">
        {messages.map((message) => (
          <MessageBubble 
            key={message.message_id}
            avatarUrl={message.sender_id === userId ? avatar : loaderData.participant?.profile?.avatar ?? ""}
            avatarFallback={message.sender_id === userId ? name.charAt(0) : loaderData.participant?.profile?.name.charAt(0) ?? ""}
            content={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form ref={formRef} className="relative flex justify-end items-center" method="post">
            <Textarea
              placeholder="Write a message..."
              rows={2}
              className="resize-none"
              name="message"
              required
            />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
} 

// browser에게 현재 route가 revalidate되어야 하는지 알려주는 함수 / default는 true
export const shouldRevalidate = () => false;
