import { Hero } from "~/common/components/hero";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Reviews | wemake" },
    { name: "description", content: "Product reviews" },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
  // TODO: Fetch reviews data from API
  return {
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "Great product!",
        author: "John Doe",
        createdAt: "2024-03-20",
      },
    ],
  };
}

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
  const { reviews } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <Hero
          title="Reviews"
          subtitle="See what others are saying about this product"
        />
        <Link to="new">
          <Button>Write a Review</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{review.author}</div>
                <div className="text-sm text-muted-foreground">
                  {review.createdAt}
                </div>
              </div>
              <div className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 