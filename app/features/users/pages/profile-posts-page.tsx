import { getUserPosts } from "../queries";
import type { Route } from "./+types/profile-posts-page";
import { PostCard } from "~/features/community/components/post-card";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Posts | WeMake", description: "WeMake 사용자 게시물 목록 페이지입니다." }
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const posts = await getUserPosts(client, { username: params.username });
  return { posts, headers };
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      { loaderData.posts.map((post) => (
        <PostCard
          key={post.post_id}
          postId={post.post_id}
          title={post.title}
          authorName={post.author_username}
          authorAvatar={post.author_avatar}
          category={post.topic}
          postedAt={post.created_at}
          expanded
        />
      ))}
  </div>
  );
} 