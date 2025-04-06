import { Button } from "../../../common/components/ui/button";

export function loader({ request }) {
  return {
    title: "제품 제출",
    description: "새로운 제품을 제출하세요.",
  };
}

export function action({ request }) {
  return {
    status: 200,
  };
}

export function meta({ data }) {
  return {
    title: data.title,
    description: data.description,
  };
}

export default function SubmitPage({ loaderData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">제품 제출</h1>
      <p className="text-lg text-gray-600">
        새로운 제품을 제출하세요.
      </p>
    </div>
  );
} 