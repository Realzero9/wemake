import type { Route } from "./+types/dashboard-product-page";
import { Hero } from "~/common/components/hero";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Dashboard | WeMake", description: "WeMake 제품 대시보드 페이지입니다." }
  ];
}

export default function DashboardProductPage() {
  return (
    <div className="space-y-20">
      <Hero title="Product Dashboard" subtitle="Manage your product" />
    </div>
  );
} 