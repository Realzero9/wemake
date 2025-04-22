import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link } from "react-router";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  avatarUrl: string;
  username: string;
  timeAgo: string;
  content: string;
  topLevel: boolean;
}

export function Reply({ avatarUrl, username, timeAgo, content, topLevel = false }: ReplyProps) {
    const [replying, setReplying] = useState(false);
    const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-start gap-5 w-2/3">
            <Avatar className="size-14">
                <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
                <AvatarImage src={avatarUrl} />
            </Avatar>
            <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center gap-2">
                <Link to={`/users/@${username.toLowerCase()}`}>
                    <h4 className="font-medium">{username}</h4>
                </Link>
                <DotIcon className="size-5" />
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
                </div>
                <p className="text-muted-foreground">{content}</p>
                <Button variant="ghost" className="self-end" onClick={toggleReplying}>
                    <MessageCircleIcon className="size-4" />
                    Reply
                </Button>
            </div>
        </div>
        {replying && (
            <Form className="flex items-start gap-5 w-3/4">
                <Avatar className="size-14">
                <AvatarFallback>N</AvatarFallback>
                <AvatarImage src="https://github.com/serranoarevalo.png" />
                </Avatar>
                <div className="flex flex-col items-end gap-5 w-full">
                <Textarea
                    placeholder="Write a reply..."
                    className="w-full resize-none"
                    rows={5}
                />
                <Button type="submit">Reply</Button>
                </div>
            </Form>
        )}
        {topLevel && (
            <div className="pl-20 w-full">
                <Reply 
                    avatarUrl="https://github.com/serranoarevalo.png"
                    username="Nicolas"
                    timeAgo="12 hours ago"
                    content="I've been using Todoist for a while now, and it's really great. It's simple and easy to use, and has a lot of features."
                    topLevel={false}
                />
            </div>
        )}
    </div>
  );
} 