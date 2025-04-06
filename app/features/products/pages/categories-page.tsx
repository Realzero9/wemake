export function loader({ request }) {
  return {
    title: "카테고리",
    description: "제품 카테고리를 확인하세요.",
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

export default function CategoriesPage({ loaderData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">카테고리</h1>
      <p className="text-lg text-gray-600">
        제품 카테고리를 확인하세요.
      </p>
    </div>
  );
} 