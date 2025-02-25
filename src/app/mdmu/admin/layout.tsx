"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout, user, checkAuthStatus } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuthStatus();

        if (!isAuth) {
          router.push("/mdmu/login");
        }
      } catch (error) {
        console.log(error);
        router.push("/mdmu/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  // Show loading state or nothing while checking authentication
  if (isLoading) {
    return null; // Or you could return a loading spinner
  }

  // If not authenticated, don't render anything
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>{user?.email}</span>
          <Link href="/mdmu/login">
            <Button onClick={logout} variant="destructive">
              Logout
            </Button>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
