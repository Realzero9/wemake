import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { Textarea } from "~/common/components/ui/textarea";
import type { Route } from "./+types/product-review-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Write a Review | wemake" },
    { name: "description", content: "Write a review for this product" },
  ];
};

export function action({ params, request }: Route.ActionArgs) {
  // TODO: Submit review to API
  return { success: true };
}

export default function ProductReviewPage() {
  return (
    <div className="container mx-auto py-8">
      <Hero
        title="Write a Review"
        subtitle="Share your experience with this product"
      />

      <Form method="post" className="max-w-xl mx-auto mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  className="sr-only peer"
                  required
                />
                <div className="text-2xl peer-checked:text-yellow-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-yellow-500 rounded-sm p-1">
                  ★
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Review</Label>
          <Textarea
            id="comment"
            name="comment"
            placeholder="Write your review here..."
            required
            className="min-h-[200px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Review
        </Button>
      </Form>
    </div>
  );
} 