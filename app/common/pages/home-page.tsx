import React from 'react';
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to WeMake
        </h1>
        <p className="text-lg text-gray-600">
          Your creative journey starts here.
        </p>
      </main>
    </div>
  );
} 