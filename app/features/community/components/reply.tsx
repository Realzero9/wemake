import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link } from "react-router";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";

interface ReplyProps {
    username: string;
    avatarUrl: string | null;
    content: string;
    timeStamp: string;
    topLevel: boolean;
    replies?: {
        post_reply_id: number;
        reply: string;
        created_at: string;
        user: {
            name: string;
            username: string;
            avatar: string | null;
        }
    }[];
}

export function Reply({ avatarUrl, username, timeStamp, content, topLevel = false, replies }: ReplyProps) {
    const [replying, setReplying] = useState(false);
    const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-start gap-5 w-2/3">
            <Avatar className="size-14">
                <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
                {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
            </Avatar>
            <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex items-center gap-2">
                <Link to={`/users/@${username.toLowerCase()}`}>
                    <h4 className="font-medium">{username}</h4>
                </Link>
                <DotIcon className="size-5" />
                <span className="text-xs text-muted-foreground">{DateTime.fromISO(timeStamp).toRelative()}</span>
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
        {topLevel && replies && (
            <div className="pl-20 w-full">
                {replies.map((reply) => (
                    <Reply 
                        username={reply.user.name}
                        avatarUrl={reply.user.avatar}
                        content={reply.reply}
                        timeStamp={reply.created_at}
                        topLevel={false}
                    />
                ))}
            </div>
        )}
    </div>
  );
} 