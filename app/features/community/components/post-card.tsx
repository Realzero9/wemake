import { Link } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "../../../common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../common/components/ui/avatar";

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
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14">
            <AvatarImage src={authorAvatar} />
            <AvatarFallback>
              <span>{authorName[0]}</span>
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>{authorName} on</span>
              <span>{category}</span>
              <span>·</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="link">Reply &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 