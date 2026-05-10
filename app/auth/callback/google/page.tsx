// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveSession } from "@/lib/api/auth";
import { API_URL } from "@/lib/api/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

type CallbackResponse = {
  token: string;
  user: AuthUser;
  message?: string;
};

export default function CallbackPage() {
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async (): Promise<void> => {
      // Forward the full query string Google sent to Laravel callback
      const queryString = searchParams.toString();

      try {
        const res = await fetch(
          `${API_URL}/auth/callback/google?${queryString}`,
        );

        const data: CallbackResponse = await res.json();

        if (!res.ok) {
          setError(data.message || "Authentication failed.");
          return;
        }

        login(data.token, data.user);

        // Redirect to dashboard
        router.replace("/dashboard");
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
    };

    handleCallback();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>

          <Link href="/login" className="mt-4 text-blue-500 underline">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

        <div className="flex justify-center items-center gap-2">
          <p className="mt-4 text-gray-500">Signing you in...</p>
        </div>
      </div>
    </div>
  );
}
