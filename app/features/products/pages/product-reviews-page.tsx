import { Hero } from "~/common/components/hero";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";

export function meta() {
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Product reviews" },
  ];
};

export default function ProductReviewsPage() {
  return (
    <div className="space-y-10 max-w-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">10 Reviews</h2>
        <Button variant={"secondary"}>Write a Review</Button>
      </div>
      <div className="space-y-20">
        {Array.from({ length: 10 }).map((_, index) => (
          <ReviewCard
            key={index}
            avatarUrl="https://github.com/facebook.png"
            avatarFallback="N"
            username="John Doe"
            handle="@username"
            rating={5}
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            createdAt="10 days ago"
          />
        ))}
      </div>
    </div>
  );
} 