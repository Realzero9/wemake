import type { Route } from "./+types/profile-products-page";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { ProductCard } from "~/features/products/components/product-card";

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
        { Array.from({ length: 5 }).map((_, index) => (
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
  );
} 