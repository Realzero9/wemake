import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";
import { PostCard } from "../../features/community/components/post-card";
import { IdeaCard } from "../../features/ideas/components/idea-card";
import { JobCard } from "../../features/jobs/components/job-card";
import { TeamCard } from "../../features/teams/components/team-card";

import { Button } from "../components/ui/button";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import type { Route } from "./+types/home-page";
import { getPosts } from "~/features/community/queries";


export const meta : MetaFunction = () => {
  return [
    { title: "Home | WeMake" },
    { name: "description", content: "WeMake is a platform for creating and sharing creative projects." },
  ];
};

export const loader = async () => {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });
  const posts = await getPosts({
    limit: 7,
    sorting: "newest",
  });
  return { products, posts };
}

export default function HomePage({ loaderData }: Route.ComponentProps ) {
  return (
    <div className="px-20 space-y-10">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
          <p className="text-xl font-light text-foreground">The best products made by our community</p>
          <Button variant="link" asChild>
            <Link to="/products/leaderboards" className="text-lg p-0">Explore All Products &rarr;</Link>
          </Button>
        </div>
          { loaderData.products
            .map((product, index) => (
            <ProductCard
              key={product.product_id}
              id={product.product_id.toString()}
              name={product.name}
              description={product.description}
              reviewsCount={product.reviews}
              viewCount={product.views}
              upvoteCount={product.upvotes}
            />
          ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
          <p className="text-xl font-light text-foreground">The latest discussions from our community</p>
          <Button variant="link" asChild>
            <Link to="/community" className="text-lg p-0">Explore All Discussions &rarr;</Link>
          </Button>
        </div>
        { loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            postId={post.post_id}
            title={post.title}
            authorName={post.author}
            authorAvatar={post.author_avatar}
            category={post.topic}
            postedAt={post.created_at}
            upvoteCount={post.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
          <p className="text-xl font-light text-foreground">Find ideas for your next project</p>
          <Button variant="link" asChild>
            <Link to="/ideas" className="text-lg p-0">Explore All Ideas &rarr;</Link>
          </Button>
        </div>
        { Array.from({ length: 11 }).map((_, index) => (
          <IdeaCard
            key={`idea-${index}`}
            id={`idea-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and traking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewCount={123}
            timeAgo="12 hours ago"
            likeCount={12}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
          <p className="text-xl font-light text-foreground">Find your dream job</p>
          <Button variant="link" asChild>
            <Link to="/jobs" className="text-lg p-0">Explore All Jobs &rarr;</Link>
          </Button>
        </div>
        { Array.from({ length: 11 }).map((_, index) => (
          <JobCard
            key={`job-${index}`}
            id={`job-${index}`}
            companyLogoUrl="https://github.com/facebook.png"
            company="Tesla"
            companyHq="San Francisco, CA"
            postedAt="12 hours ago"
            title="Software Engineer"
            type="Full-Time"
            positionLocation="Remote"
            salary="$100,000 - $120,000"
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Find a team mate</h2>
          <p className="text-xl font-light text-foreground">Join a team looking for a new member</p>
          <Button variant="link" asChild>
            <Link to="/teams" className="text-lg p-0">Explore All teams &rarr;</Link>
          </Button>
        </div>
        { Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={`team-${index}`}
            id={`team-${index}`}
            username="lynn"
            userAvatar="https://github.com/inthetiger.png"
            lookingFor={["React Developer", "Backend Developer", "Product Developer"]}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  );
} 