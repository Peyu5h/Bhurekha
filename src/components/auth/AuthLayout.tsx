"use client";

import { useEffect, useState } from "react";
import AuthWrapper from "~/components/auth/AuthWrapper";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./AuthProvider";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useWalletAuth();

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

  // Special case for SUB_REGISTRAR users on authority pages - bypass auth checks
  if (
    !isLoading &&
    user &&
    user.role === "SUB_REGISTRAR" &&
    pathname.startsWith("/authority") &&
    pathname !== "/authority"
  ) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </AuthProvider>
  );
}
