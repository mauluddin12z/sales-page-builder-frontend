"use client";

import {
  Sparkles,
  LogOut,
  LayoutDashboard,
  Plus,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/Button";
import { useState } from "react";
import Modal from "../ui/Modal";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(image:--gradient-primary) shadow-glow group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden md:block font-semibold tracking-tight">
              AI Sales Page Builder
            </span>
          </Link>

          {/* Navigation */}
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

                <Button variant="ghost" size="icon" onClick={openLogoutModal}>
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

      {/* Logout Modal */}
      <Modal isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <LogOut className="h-7 w-7 text-destructive" />
          </div>

          <h1 className="text-xl font-bold text-foreground">
            Log out of session?
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            You will be logged out of your session. Any unsaved changes will be
            lost.
          </p>

          <div className="mt-6 flex gap-3">
            <Button
              variant="default"
              onClick={closeLogoutModal}
              className="px-10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleLogout}
              isLoading={isLoggingOut}
              loadingText="Logging out..."
              className="px-10"
            >
              Yes, Log out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
