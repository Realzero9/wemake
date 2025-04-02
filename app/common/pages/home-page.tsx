import { Button } from "~/common/components/ui/button";

export default function HomePage() {
  return (
    <div className="dark min-h-screen mt-10">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to WeMake
        </h1>
        <p className="text-lg text-gray-600">
          Your creative journey starts here.
        </p>
        <Button>
            Click me
        </Button>
      </main>
    </div>
  );
} 