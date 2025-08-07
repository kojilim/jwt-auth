"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Redirect to /sign-in as soon as this page loads
  useEffect(() => {
    router.replace("/sign-in");
  }, [router]);

  return null; // Render nothing, since user is being redirected immediately
}
