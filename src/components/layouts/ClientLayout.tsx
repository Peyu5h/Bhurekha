"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "~/providers/AuthProvider";
import { usePathname } from "next/navigation";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  // For auth pages, don't wrap in AuthProvider to prevent redirect loops
  if (isAuthPage) {
    return <>{children}</>;
  }

  return <AuthProvider>{children}</AuthProvider>;
}
