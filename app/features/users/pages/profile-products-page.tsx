import { ProductCard } from "~/features/products/components/product-card";

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
        { Array.from({ length: 5 }).map((_, index) => (
          <ProductCard
            key={index}
            id={index}
            name="Product Name"
            description="Product Description"
            reviewsCount="100"
            viewCount="10"
            upvoteCount="100"
          />
        ))}
    </div>
  );
} 