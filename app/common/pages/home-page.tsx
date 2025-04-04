import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";
import { PostCard } from "../../features/community/post-card";
import { IdeaCard } from "../../features/ideas/components/idea-card";

import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
export const meta : MetaFunction = () => {
  return [
    { title: "Home | WeMake" },
    { name: "description", content: "WeMake is a platform for creating and sharing creative projects." },
  ];
};

export default function HomePage() {
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
          { Array.from({ length: 10 }).map((_, index) => (
            <ProductCard
              id={`productId-${index}`}
              name="Product Name"
              description="Product Description"
              commentCount={100}
              viewCount={100}
              upvoteCount={100}
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
        { Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            postId={`postId-${index}`}
            title="What is the best productivity tool?"
            authorName="Nico"
            authorAvatar="https://github.com/apple.png"
            category="productivity"
            timeAgo="12 hours ago"
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
        { Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            id={`ideaId-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and traking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewCount={123}
            timeAgo="12 hours ago"
            likeCount={12}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
} 