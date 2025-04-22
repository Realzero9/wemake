import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "../components/reply";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `${params.postId} | wemake`, description: "게시글 페이지입니다" },
  ];
};

export default function PostPage() {
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community?topic=productivity">Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postId">What is the best way to productivity tool?</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>10</span>
            </Button>
            <div className="space-y-20">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  What is the best way to productivity tool?
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    @nico
                  </span>
                  <DotIcon className="size-5" />
                  <span>12 hours ago</span>
                  <DotIcon className="size-5" />
                  <span>10 replies</span>
                </div>
                <p className="text-muted-foreground w-2/3">
                  Hello, I'm looking for the best productivity tool that can help me manage my time and tasks. Any recommendations? 
                  I have tried using Notion, but it's not what I'm looking for. I dream of a tool that can help me manage my time and tasks.
                  Any suggestions?
                </p>
              </div>
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
              <div className="space-y-10">
                <h4 className="font-semibold">10 replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply 
                    avatarUrl="https://github.com/serranoarevalo.png"
                    username="Nicolas"
                    timeAgo="12 hours ago"
                    content="I've been using Todoist for a while now, and it's really great. It's simple and easy to use, and has a lot of features."
                    topLevel={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/serranoarevalo.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Nicolas</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <div className="text-sm flex flex-col gap-2">
            <span>🎂 Joined 3 month ago</span>
            <span>🚀 Launched 10 products</span>
          </div>
          <Button variant="outline" className="w-full">Follow</Button>
        </aside>
      </div>
    </div>
  );
}
