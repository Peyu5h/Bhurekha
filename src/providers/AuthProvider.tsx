"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useWalletAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      const isAuth = !!user;
      setIsAuthenticated(isAuth);

      // Handle auth redirects
      if (!isAuth && !pathname.startsWith("/auth")) {
        router.push("/auth/login");
      } else if (isAuth && pathname.startsWith("/auth")) {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
