import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarUrl: string;
  avatarFallback: string;
  username: string;
  action: string;
  timestamp: string;
  seen: boolean;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  username,
  action,
  timestamp,
  seen,
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-500/60")}>
      <CardHeader className="flex flex-row items-start gap-5">
        <Avatar>
          <AvatarImage className="size-14 rounded-full" src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{username}</span>
            <span>{" "}{action}</span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="icon">
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
} 