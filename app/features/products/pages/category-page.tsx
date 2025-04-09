import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components/product-card";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";

export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | wemake` },
    { name: "description", content: "Browse developer tools on wemake" },
  ];
}

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <Hero title="Developer Tools" subtitle="Tools for developers" />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        { Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`product-${index}`}
            id={`product-${index}`}
            name="Product Name"
            description="Product Description"
            commentCount={100}
            viewCount={100}
            upvoteCount={100}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
} 