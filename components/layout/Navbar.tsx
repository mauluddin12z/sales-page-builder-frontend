"use client";

import { Sparkles, LogOut, LayoutDashboard, Plus } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/Button";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(image:--gradient-primary) shadow-glow group-hover:scale-105 transition-transform">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">SalesAI</span>
        </Link>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="hidden sm:inline-flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>

              <Button
                size="sm"
                onClick={() => router.push("/generate")}
                className="bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 shadow-glow"
              >
                <Plus className="h-4 w-4" />
                New page
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={async () => {
                  await logout();
                  router.push("/login");
                }}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/login")}
              >
                Sign in
              </Button>

              <Button
                size="sm"
                onClick={() => router.push("/register")}
                className="bg-(image:--gradient-primary) text-primary-foreground hover:opacity-90 shadow-glow"
              >
                Get started
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
