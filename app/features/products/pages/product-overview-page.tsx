import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/product-overview-page";
import { ChevronUpIcon, ShareIcon, StarIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Link, useOutletContext } from "react-router";

export default function ProductOverviewPage() {
  const { description, how_it_works } = useOutletContext<{
    description: string;
    how_it_works: string;
  }>();
  return (
    <div className="space-y-20">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this product?</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">What does it work?</h3>
          <p className="text-muted-foreground">{how_it_works}</p>
        </div>
      </div>
    </div>
  );
} 