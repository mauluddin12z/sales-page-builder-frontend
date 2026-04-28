"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loading } = useAuth();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
