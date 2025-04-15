import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface ReviewCardProps {
  avatarUrl: string;
  avatarFallback: string;
  username: string;
  handle: string;
  rating: number;
  content: string;
  createdAt: string;
}

export function ReviewCard({
  avatarUrl,
  avatarFallback,
  username,
  handle,
  rating,
  content,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{avatarFallback}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{username}</h4>
          <p className="textsm text-muted-foreground">{handle}</p>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon key={index} className="size-4" fill="currentColor" />
        ))}
      </div>
      <p className="text-muted-foreground">{content}</p>
      <span className="text-xs text-muted-foreground">{createdAt}</span>
    </div>
  );
} 