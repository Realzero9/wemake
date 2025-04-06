export function loader({ request, params }) {
  const { category } = params;
  return {
    title: `${category} 카테고리`,
    description: `${category} 카테고리의 제품을 확인하세요.`,
    category,
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

export default function CategoryPage({ loaderData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{loaderData.category} 카테고리</h1>
      <p className="text-lg text-gray-600">
        {loaderData.category} 카테고리의 제품을 확인하세요.
      </p>
    </div>
  );
} 