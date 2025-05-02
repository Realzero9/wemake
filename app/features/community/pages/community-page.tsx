import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Await, Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { useSearchParams } from "react-router";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getTopics, getPosts } from "../queries";
import { Suspense } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Community | wemake", description: "커뮤니티 페이지입니다" },
  ];
};

// [서버쪽작동] component 렌더링 전에 데이터를 가져오는 함수
export const loader = async () => {
  const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
  return { topics, posts };
}

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  return (
    <div>
      <Hero title="Community" subtitle="Ask questions, share ideas, and connect with other developers" />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span>
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className="capitalize cursor-pointer"
                          key={option}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <Input type="text" name="search" placeholder="Search..." />
              </Form>
            </div>
            <Button asChild >
              <Link to="/community/submit">
                Create Discussion
              </Link>
            </Button>
          </div>
            <div className="space-y-5">
              {loaderData.posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  postId={post.post_id}
                  title={post.title}
                  authorName={post.author}
                  authorAvatar={post.author_avatar}
                  category={post.topic}
                  postedAt={post.created_at}
                  upvoteCount={post.upvotes}
                  expanded={true}
                />
              ))}
            </div>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">Topics</span>
              <div className="flex flex-col gap-4 items-start">
                  {loaderData.topics.map((topic) => (
                    <Button 
                      asChild
                      variant={"link"}
                      key={topic.slug}
                      className="pl-0"
                    >
                      <Link
                        key={topic.slug}
                        to={`/community?topic=${topic.slug}`}
                        className="font-semibold"
                      >
                        {topic.name}
                      </Link>
                    </Button>
                  ))}
              </div>
        </aside>
      </div>
    </div>
  );
}

// 로딩상태를 신경쓰지 않고 렌더링 하는 방법
export function HydrateFallback() {
  return <div>Loading...</div>;
}

// 오류상태를 처리하는 방법
export function ErrorBoundary() {
  return <div>Error</div>;
}