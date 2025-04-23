import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import { MessageBubble } from "../components/messages-bubble";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Message Details | WeMake", description: "WeMake 메시지 상세 페이지입니다." }
  ];
}

export default function MessagePage() {
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback>CN</AvatarFallback>
            <AvatarImage src="https://github.com/stevejobs.png" />
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle>Steve Jobs</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <MessageBubble 
            key={index}
            avatarSrc="https://github.com/stevejobs.png"
            avatarFallback="S"
            content="this is a message from steve jobs in iheaven, make sure to reply because if you don't, you will be punished by the god"
            isCurrentUser={index % 2 === 0}
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