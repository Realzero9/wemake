
import { data, Form } from "react-router";
import { Button } from "../../../common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/search-page";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { Input } from "~/common/components/ui/input";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products on wemake" },
  ];
};

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  //console.log(Object.fromEntries(url.searchParams), url.searchParams);
  const {success, data: parsedData} = paramsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw new Error("Invalid query");
  }
  return {
    ...parsedData,
  };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Search" subtitle="Search for products on wemake" />
      {/* react router가 제공하는 Form // form과는 다름 */}
      <Form className="flex justify-center max-w-screen-sm items-center gap-2 mx-auto">
        <Input name="query" placeholder="Search for products" className="text-lg" />
        <Button type="submit">Search</Button>
      </Form>
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