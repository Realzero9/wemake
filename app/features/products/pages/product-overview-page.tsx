import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/product-overview-page";
import { ChevronUpIcon, ShareIcon, StarIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Product Overview | wemake" },
    { name: "description", content: "View product details and information" },
  ];
}

export default function ProductOverviewPage({ params: {productId} }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50" />
          <div>
            <h1 className="text-5xl font-bold">Product Name</h1>
            <p className="text-2xl text-light">Product Description</p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon className="size-4" fill="currentColor"></StarIcon>
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={"secondary"} size="lg" className="text-lg h-14 px-10">
            Visit Website
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote (100)
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <Button variant={"outline"} asChild>
          <Link to={`/products/${productId}/overview`}>Overview</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link to={`/products/${productId}/reviews`}>Reviews</Link>
        </Button>
      </div>
      <div className="space-y-10">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">What is this product?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
      <div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">What does it work?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    </div>
  );
} 