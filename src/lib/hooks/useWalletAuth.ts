"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

type RegisterValues = Omit<User, "id" | "walletAddress">;

const STORAGE_KEY = "bhurekha.tempUser";
const isBrowser = typeof window !== "undefined";

const DEFAULT_USER_PROFILE: User = {
  id: "",
  name: "",
  walletAddress: "",
  role: "USER",
  dob: "",
  gender: "",
  address: "",
  mobileNumber: "",
  departmentId: "",
  designation: "",
};

const ROLE_PRESETS: Record<UserRole, Partial<User>> = {
  USER: {
    name: "Guest Applicant",
    address: "Sample Residence, Mumbai, MH",
    gender: "Prefer not to say",
    mobileNumber: "9000000000",
  },
  SUB_REGISTRAR: {
    name: "Guest Sub-Registrar",
    address: "District Registrar Office, Mumbai",
    departmentId: "SR-001",
    designation: "Sub-Registrar",
    mobileNumber: "9000000001",
    gender: "Prefer not to say",
  },
};

const safeParse = (value: string | null): User | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      ...DEFAULT_USER_PROFILE,
      ...parsed,
    };
  } catch {
    return null;
  }
};

const readCachedUser = () => {
  if (!isBrowser) return null;
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

const writeCachedUser = (value: User | null) => {
  if (!isBrowser) return;
  if (!value) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `temp-${Math.random().toString(36).slice(2, 10)}`;
};

const generateWalletAlias = (role: UserRole) =>
  `TEMP-${role}-${Math.random().toString(36).slice(2, 8)}`;

export const useWalletAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hydrateUser = useCallback(() => {
    try {
      const cached = readCachedUser();
      setUser(cached);
      setUserError(null);
    } catch (error) {
      setUserError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  useEffect(() => {
    if (!isBrowser) return;
    const handler = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        hydrateUser();
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [hydrateUser]);

  const persistUser = useCallback((nextUser: User | null) => {
    writeCachedUser(nextUser);
    setUser(nextUser);
  }, []);

  const registerUser = useCallback(
    async (values: RegisterValues) => {
      const rolePreset = ROLE_PRESETS[values.role] ?? {};
      const nextUser: User = {
        ...DEFAULT_USER_PROFILE,
        ...rolePreset,
        ...values,
        id: generateId(),
        walletAddress: generateWalletAlias(values.role),
        role: values.role,
      };

      persistUser(nextUser);

      toast.success(
        values.role === "SUB_REGISTRAR"
          ? "Registered as sub-registrar"
          : "Registered as user",
      );

      return nextUser;
    },
    [persistUser],
  );

  const logout = useCallback(async () => {
    persistUser(null);
    toast.success("Signed out");
    router.push("/");
  }, [persistUser, router]);

  const updateProfile = useCallback(
    (updates: Partial<User>) => {
      if (!user) return null;
      const nextUser = { ...user, ...updates };
      persistUser(nextUser);
      return nextUser;
    },
    [user, persistUser],
  );

  const setRole = useCallback(
    (role: UserRole) => {
      if (!user) {
        const rolePreset = ROLE_PRESETS[role] ?? {};
        const nextUser: User = {
          ...DEFAULT_USER_PROFILE,
          ...rolePreset,
          id: generateId(),
          walletAddress: generateWalletAlias(role),
          role,
        };
        persistUser(nextUser);
        return nextUser;
      }

      const rolePreset = ROLE_PRESETS[role] ?? {};
      return updateProfile({
        role,
        ...rolePreset,
      });
    },
    [user, persistUser, updateProfile],
  );

  const isConnected = Boolean(user);
  const currentWallet = user?.walletAddress ?? null;

  return useMemo(
    () => ({
      user,
      isLoading,
      isConnected,
      currentWallet,
      registerUser,
      userError,
      logout,
      isCorrectChain: true,
      setRole,
      updateProfile,
      hydrateUser,
    }),
    [
      user,
      isLoading,
      isConnected,
      currentWallet,
      registerUser,
      userError,
      logout,
      setRole,
      updateProfile,
      hydrateUser,
    ],
  );
};
