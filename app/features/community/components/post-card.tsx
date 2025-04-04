import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../../../common/components/ui/avatar";
import { Badge } from "../../../common/components/ui/badge";

interface PostCardProps {
  postId: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  category: string;
  timeAgo: string;
}

export function PostCard({
  postId,
  title,
  authorName,
  authorAvatar,
  category,
  timeAgo,
}: PostCardProps) {
  return (
    <Link to={`/community/${postId}`}>
      <div className="flex flex-col gap-4 p-4 bg-transparent transition-colors hover:bg-card/50 rounded-lg">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={authorAvatar} alt={authorName} />
            <AvatarFallback>{authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{authorName}</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
        <Badge variant="outline">{category}</Badge>
      </div>
    </Link>
  );
} 