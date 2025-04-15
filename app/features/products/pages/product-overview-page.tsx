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
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this product?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
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