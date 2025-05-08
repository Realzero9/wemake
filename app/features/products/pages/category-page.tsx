import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components/product-card";
import { getCategory, getProductsByCategory, getCategoryPagesByCategory } from "../queries";
import { z } from "zod";

export const meta = ({ data: { category : { name, description } } }: Route.MetaArgs) => {
  return [
    { title: `${name} | wemake` },
    { name: "description", content: description },
  ];
}

const paramsSchema = z.object({
  category: z.coerce.number(),
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const { data, success } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Response("Invalid category", { status: 400 });
  }
  const category = await getCategory(data.category);
  const products = await getProductsByCategory({
    categoryId: data.category,
    page: Number(page),
  });
  const totalPages = await getCategoryPagesByCategory(data.category);
  return { category, products, totalPages };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title={loaderData.category.name} subtitle={loaderData.category.description} />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        { loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
} 