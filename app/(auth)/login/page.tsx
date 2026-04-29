"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { mutate } from "swr";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // redirect if already logged in
  const { user, loading: userLoading } = useAuth();
  useEffect(() => {
    if (!userLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, userLoading, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);

    try {
      const payload = { email, password };
      await login(payload);
      mutate(() => true);
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message;

        setError(message);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-(image:--gradient-soft) items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(image:--gradient-primary) shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            AI Sales Page Builder
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-(--shadow-lg)">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your account to continue.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 h-10"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <a
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
