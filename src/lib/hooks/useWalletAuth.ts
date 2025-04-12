"use client";

import { useEffect, useState } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { toast } from "sonner";
import { polygonAmoy } from "viem/chains";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "../api";

export type UserRole = "USER" | "SUB_REGISTRAR";

export interface User {
  id: string;
  name: string;
  walletAddress: string;
  role: UserRole;
  dob?: string;
  gender?: string;
  address?: string;
  mobileNumber?: string;
  departmentId?: string;
  designation?: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export const useWalletAuth = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isLoading, setIsLoading] = useState(true);
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<User | null>({
    queryKey: ["user", address],
    queryFn: async () => {
      if (!address) return null;
      try {
        // Added 404 handling and error formatting
        const response = await api.get<User>(
          `/api/user?walletAddress=${address}`,
        );
        console.log("User found:", response.data);
        return response.data || null;
      } catch (error: any) {
        // Not logging 404s as errors since they're expected for new users
        if (error.response && error.response.status === 404) {
          console.log("User not found for wallet:", address);
          return null;
        }
        return null;
      }
    },
    enabled: !!address && isConnected,
    staleTime: 1 * 60 * 1000, // 1 minute - reduced for testing
    retry: false, // No retries to avoid unnecessary API calls
  });

  useEffect(() => {
    if (!isUserLoading) {
      setIsLoading(false);
    }
  }, [isUserLoading]);

  useEffect(() => {
    if (isConnected && chainId !== polygonAmoy.id) {
      toast.error("Please switch to Polygon Amoy testnet");
    }
  }, [isConnected, chainId]);

  useEffect(() => {
    if (address) {
      queryClient.invalidateQueries({ queryKey: ["user", address] });
    }
  }, [address, queryClient]);

  useEffect(() => {
    if (user) {
      // Set cookies for authentication
      document.cookie = `token=${user.id}; path=/; SameSite=Strict`;
      document.cookie = `userRole=${user.role}; path=/; SameSite=Strict`;
    } else if (!isLoading && !isUserLoading && address) {
      // Only clear cookies when wallet is connected but no user found
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, [user, isLoading, isUserLoading, address]);

  const registerUser = async (values: Omit<User, "id" | "walletAddress">) => {
    if (!address) throw new Error("Wallet not connected");

    try {
      const response = await api.post<ApiResponse<User>>("/api/user", {
        ...values,
        walletAddress: address,
      });

      const newUser = response.data.data;
      await queryClient.invalidateQueries({ queryKey: ["user", address] });

      toast.success("Registration successful!");
      return newUser;
    } catch (error) {
      console.log("Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to register user",
      );
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear cookies before disconnecting
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      await disconnect();
      await queryClient.invalidateQueries();

      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  return {
    user,
    isLoading,
    isConnected,
    currentWallet: address,
    registerUser,
    userError,
    logout,
    isCorrectChain: chainId === polygonAmoy.id,
  };
};
