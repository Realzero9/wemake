import { Link } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "../../../common/components/ui/card";
import { Badge } from "../../../common/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../common/components/ui/avatar";

interface TeamCardProps {
  id: number;
  username: string;
  leaderAvatarUrl: string | null;
  positions: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  username,
  leaderAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`} className="block">
      <Card className="bg-transparent hover:bg-card/50 flex flex-col justify-between transition-colors h-full">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base leading-loose">
            <Badge variant={"secondary"} className="inline-flex shadow-sm items-center text-base">
              <span>@{username}</span>
              <Avatar className="size-5">
                <AvatarFallback>{username[0]}</AvatarFallback>
                { leaderAvatarUrl ? <AvatarImage src={leaderAvatarUrl} /> : null}
              </Avatar>
            </Badge>
            <span> is looking for</span>
            {positions.map((role) => (
              <Badge key={role} className="text-base">
                {role}
              </Badge>
            ))}
            <span> to build </span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link">
            Join Team &rarr;
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 