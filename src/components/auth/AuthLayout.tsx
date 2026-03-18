"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: ClientLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useWalletAuth();
  const [mounted, setMounted] = useState(false);
  const [hasRouted, setHasRouted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isAuthPage = pathname.startsWith("/auth");
    const isAuthorityPage = pathname.startsWith("/authority");
    const isAuthorityRoot = pathname === "/authority";

    const redirectTo = (target: string) => {
      if (pathname !== target) {
        setHasRouted(true);
        router.replace(target);
      }
    };

    if (isLoading && !user) {
      if (!isAuthPage && !hasRouted) {
        redirectTo("/auth/login");
      }
      return;
    }

    if (!user) {
      if (!isAuthPage && !hasRouted) {
        redirectTo("/auth/login");
      }
      return;
    }

    if (user.role === "SUB_REGISTRAR") {
      if (!isAuthorityPage) {
        redirectTo("/authority/verifications");
        return;
      }
      if (isAuthorityRoot) {
        redirectTo("/authority/verifications");
        return;
      }
    }

    if (user.role === "USER" && isAuthorityPage) {
      redirectTo("/dashboard");
      return;
    }

    if (isAuthPage) {
      redirectTo(
        user.role === "SUB_REGISTRAR"
          ? "/authority/verifications"
          : "/dashboard",
      );
    }
  }, [user, isLoading, pathname, router, mounted, hasRouted]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
