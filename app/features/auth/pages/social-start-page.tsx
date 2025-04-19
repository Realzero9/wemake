
export default function SocialStartPage() {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">소셜 로그인</h1>
        <p className="text-gray-600">소셜 로그인을 진행중입니다</p>
      </div>
      <div className="flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    </div>
  );
} 