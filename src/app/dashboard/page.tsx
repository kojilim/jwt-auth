"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    // Logs the user out by POSTing to the logout API, then redirects to sign-in page
    async function handleLogout() {
        // Call the logout endpoint to clear the auth_token cookie
        await fetch("/api/auth/logout", { method: "POST" });
        // Redirect to the sign-in page after logout
        router.push("/sign-in");
    }

    return (
        <main className="flex min-h-screen items-center justify-center flex-col gap-6">
            {/* Welcome message for authenticated users */}
            <h1 className="text-3xl font-bold">You are logged in! HELLO WORLD!</h1>
            {/* Logout button triggers handleLogout */}
            <button
                onClick={handleLogout}
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition"
            >
                Log Out
            </button>
        </main>
    );
}
