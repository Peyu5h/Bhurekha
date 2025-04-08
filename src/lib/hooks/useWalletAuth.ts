import { useEffect, useState } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { toast } from "sonner";
import { polygonAmoy } from "viem/chains";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<User | null>({
    queryKey: ["user", address],
    queryFn: async () => {
      if (!address) return null;
      try {
        const response = await api.get<User>(
          `/api/user?walletAddress=${address}`,
        );
        console.log(response.data);
        return response.data || null;
      } catch (error) {
        console.log("Error fetching user:", error);
        return null;
      }
    },
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  useEffect(() => {
    if (!isUserLoading) {
      setIsLoading(false);
    }
  }, [isUserLoading]);

  useEffect(() => {
    if (isConnected && chainId !== polygonAmoy.id) {
      toast.error("Please switch to Polygon Amoy testnet");
      disconnect();
    }
  }, [isConnected, chainId, disconnect]);

  useEffect(() => {
    if (address) {
      queryClient.invalidateQueries({ queryKey: ["user", address] });
    }
  }, [address, queryClient]);

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

  return {
    user,
    isLoading,
    isConnected,
    currentWallet: address,
    registerUser,
    userError,
  };
};
