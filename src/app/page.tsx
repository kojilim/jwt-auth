"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => router.push("/sign-in")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Sign In
      </button>
    </main>
  );
}
