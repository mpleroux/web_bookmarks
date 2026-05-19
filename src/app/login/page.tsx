"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<"credentials" | "guest" | null>(
    null,
  );

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting("credentials");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error);
      setSubmitting(null);
    } else {
      router.push("/");
    }
  };

  const handleGuestSignIn = async () => {
    setError(null);
    setSubmitting("guest");

    // Known security risk for demo purposes
    const { error } = await signIn(
      process.env.NEXT_PUBLIC_GUEST_EMAIL!,
      process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
    );

    if (error) {
      setError(error);
      setSubmitting(null);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mx-auto max-w-sm rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <h1 className="text-lg">Sign In</h1>
      <form onSubmit={handleSubmit} className="text-sm">
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-xs"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-xs"
          />
        </div>

        {error && (
          <div className="mb-4 text-red-600 dark:text-red-400">{error}</div>
        )}

        <div className="mb-4">
          <button
            type="submit"
            disabled={submitting !== null}
            className="mr-3 px-3">
            {submitting === "credentials" ? "Signing in..." : "Sign In"}
          </button>

          <button type="button" onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </form>

      <hr className="my-4 border-gray-300 dark:border-gray-600"></hr>

      <div>
        <button
          type="button"
          onClick={handleGuestSignIn}
          disabled={submitting !== null}
          className="btn-secondary">
          {submitting === "guest" ? "Signing in..." : "Sign in as Guest"}
        </button>
      </div>
    </div>
  );
}
