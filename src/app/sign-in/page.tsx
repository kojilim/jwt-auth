"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            console.log("Redirecting to dashboard...");
            router.push("/dashboard");
        } else {
            setError(data.message || "Login failed");
        }

        setLoading(false);
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Sign In</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
                    )}

                    <div>
                        <label htmlFor="username" className="block mb-1 font-medium">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </main>
    );
}
