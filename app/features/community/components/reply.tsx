import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link, useOutletContext, useActionData } from "react-router";
import { useEffect, useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
import type { action } from "../pages/post-page";

interface ReplyProps {
    name: string;
    username: string;
    avatarUrl: string | null;
    content: string;
    timeStamp: string;
    topLevel: boolean;
    topLevelId: number;
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

export function Reply({
    name,
    username,
    avatarUrl,
    content,
    timeStamp,
    topLevel = false,
    topLevelId,
    replies
}: ReplyProps) {
    const actionData = useActionData<typeof action>();
    const [replying, setReplying] = useState(false);
    const toggleReplying = () => setReplying((prev) => !prev);
    const {
        isLoggedIn,
        name: loggedInName,
        avatar
    } = useOutletContext<{
        isLoggedIn: boolean;
        name: string;
        avatar: string;
    }>();
    useEffect(() => {
        if (actionData?.ok) {
            setReplying(false);
        }
    }, [actionData?.ok]);
  return (
    <div className="flex flex-col gap-4">
        <div className="flex items-start gap-5 w-2/3">
            <Avatar className="size-14">
                <AvatarFallback>{name[0]}</AvatarFallback>
                {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
            </Avatar>
            <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex items-center gap-2">
                <Link to={`/users/${username}`}>
                    <h4 className="font-medium">{name}</h4>
                </Link>
                <DotIcon className="size-5" />
                <span className="text-xs text-muted-foreground">{DateTime.fromISO(timeStamp).toRelative()}</span>
                </div>
                <p className="text-muted-foreground">{content}</p>
                {isLoggedIn ? (
                    <Button variant="ghost" className="self-end" onClick={toggleReplying}>
                        <MessageCircleIcon className="size-4" />
                        Reply
                    </Button>
                ) : null }
            </div>
        </div>
        {replying && (
            <Form className="flex items-start gap-5 w-3/4" method="post">
                <input type="hidden" name="topLevelId" value={topLevelId} />
                <Avatar className="size-14">
                    <AvatarFallback>{loggedInName[0]}</AvatarFallback>
                    <AvatarImage src={avatar} />
                </Avatar>
                <div className="flex flex-col items-end gap-5 w-full">
                <Textarea
                    name="reply"
                    placeholder="Write a reply..."
                    className="w-full resize-none"
                    defaultValue={`@${username} `}
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
                        key={reply.post_reply_id}
                        name={reply.user.name}
                        username={reply.user.name}
                        avatarUrl={reply.user.avatar}
                        content={reply.reply}
                        timeStamp={reply.created_at}
                        topLevel={false}
                        topLevelId={topLevelId}
                    />
                ))}
            </div>
        )}
    </div>
  );
} 