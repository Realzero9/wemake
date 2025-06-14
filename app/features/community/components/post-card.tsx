import { Link, useFetcher } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "../../../common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../common/components/ui/avatar";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
  postId: number;
  title: string;
  authorName: string;
  authorAvatar: string | null;
  category: string;
  postedAt: string;
  expanded?: boolean;
  upvoteCount?: number;
  isUpvoted?: boolean;
}

export function PostCard({
  postId,
  title,
  authorName,
  authorAvatar,
  category,
  postedAt,
  expanded = false,
  upvoteCount = 0,
  isUpvoted = false,
}: PostCardProps) {
  const fetcher = useFetcher();
  const optimisticVotesCount =
    fetcher.state === "idle" ? upvoteCount : isUpvoted ? upvoteCount - 1 : upvoteCount + 1;
  const optimisticIsUpvoted =
    fetcher.state === "idle" ? isUpvoted : !isUpvoted;
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetcher.submit(null,
      {
        method: "POST",
        action: `/community/${postId}/upvote`
      }
    );
  }
  return (
    <Link to={`/community/${postId}`} className="block">
      <Card className={cn("bg-transparent hover:bg-card/50 transition-colors", 
        expanded ? "flex flex-row items-center justify-between" : "bg-card/50")}>
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14">
            <AvatarFallback><span>{authorName[0]}</span></AvatarFallback>
            {authorAvatar ? <AvatarImage src={authorAvatar} /> : null}
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>{authorName} on</span>
              <span>{category}</span>
              <span>·</span>
              <span>{DateTime.fromISO(postedAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end pb-0">
            <Button
              onClick={absorbClick}
              variant="outline"
              className={cn(
                "flex flex-col h-14",
                optimisticIsUpvoted
                  ? "border-primary text-primary"
                  : ""
              )}
            >
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{optimisticVotesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
} 