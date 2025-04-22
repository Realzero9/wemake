import type { Route } from "./+types/profile-posts-page";
import { PostCard } from "~/features/community/components/post-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Posts | WeMake", description: "WeMake 사용자 게시물 목록 페이지입니다." }
  ];
}

export default function ProfilePostsPage() {
  return (
    <div className="flex flex-col gap-5">
      { Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          key={`post-${index}`}
          postId={`postId-${index}`}
          title="What is the best productivity tool?"
          authorName="Nico"
          authorAvatar="https://github.com/apple.png"
          category="productivity"
          timeAgo="12 hours ago"
          expanded
        />
      ))}
  </div>
  );
} 