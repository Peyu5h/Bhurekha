"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  logout: () => Promise<void>;
  needsRegistration: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: async () => {},
  needsRegistration: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout, currentWallet, isCorrectChain } =
    useWalletAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsRegistration, setNeedsRegistration] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [redirectInProgress, setRedirectInProgress] = useState(false);
  const [lastRedirectPath, setLastRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && currentWallet && !user && isCorrectChain) {
      setNeedsRegistration(true);
      setIsAuthenticated(false);

      if (!pathname.startsWith("/auth") && pathname !== "/") {
        if (lastRedirectPath !== "/auth/login") {
          setLastRedirectPath("/auth/login");
          router.push("/auth/login");
        }
      }
    } else {
      setNeedsRegistration(false);
      setIsAuthenticated(!!user);
    }
  }, [
    user,
    isLoading,
    currentWallet,
    isCorrectChain,
    pathname,
    router,
    lastRedirectPath,
  ]);

  useEffect(() => {
    if (isAuthenticated && user && !isLoading && !redirectInProgress) {
      if (pathname.startsWith("/auth")) {
        const targetPath =
          user.role === "SUB_REGISTRAR" ? "/authority" : "/dashboard";
        if (lastRedirectPath !== targetPath) {
          setRedirectInProgress(true);
          setLastRedirectPath(targetPath);
          router.push(targetPath);
        }
      } else if (
        user.role === "SUB_REGISTRAR" &&
        !pathname.startsWith("/authority")
      ) {
        if (lastRedirectPath !== "/authority") {
          setRedirectInProgress(true);
          setLastRedirectPath("/authority");
          router.push("/authority");
        }
      } else if (user.role === "USER" && pathname.startsWith("/authority")) {
        if (lastRedirectPath !== "/dashboard") {
          setRedirectInProgress(true);
          setLastRedirectPath("/dashboard");
          router.push("/dashboard");
        }
      }
    }
  }, [
    user,
    isAuthenticated,
    isLoading,
    pathname,
    router,
    redirectInProgress,
    lastRedirectPath,
  ]);

  useEffect(() => {
    setRedirectInProgress(false);
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        logout,
        needsRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
