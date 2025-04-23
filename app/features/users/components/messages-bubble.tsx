import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  avatarSrc: string;
  avatarFallback: string;
  content: string;
  isCurrentUser?: boolean;
}

export function MessageBubble({ avatarSrc, avatarFallback, content, isCurrentUser = false }: MessageBubbleProps) {
  return (
    <div className={cn("flex items-end gap-4", isCurrentUser && "flex-row-reverse")}>
      <Avatar>
        <AvatarFallback>{avatarFallback}</AvatarFallback>
        <AvatarImage src={avatarSrc} />
      </Avatar>
      <div className={cn({
        "rounded-md p-4 text-sm w-1/4":true,
        "bg-accent rounded-br-none": isCurrentUser,
        "bg-primary/50 text-primary-foreground rounded-bl-none": !isCurrentUser,
      })}>
        <p>{content}</p>
      </div>
    </div>
  );
} 