"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import RegisterModal from "~/components/RegisterModal";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function MainPage() {
  const { isConnected, address } = useAccount();
  const { user, isLoading, registerUser } = useWalletAuth();
  const [showRegister, setShowRegister] = useState(false);

  React.useEffect(() => {
    if (isConnected && !isLoading && !user) {
      setShowRegister(true);
    }
  }, [isConnected, isLoading, user]);

  const handleRegister = async (values: {
    name: string;
    role: "CUSTOMER" | "RETAILER" | "LOGISTIC";
  }) => {
    await registerUser(values);
    setShowRegister(false);
  };

  return (
    <div className="container mx-auto flex h-screen max-w-xl items-center justify-center py-8">
      <>
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <w3m-button />
          </div>
        ) : user ? (
          <div className="bg-card flex flex-col justify-center space-y-6 rounded-lg p-6">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-2xl">
                  Welcome{" "}
                  <span className="font-bold">
                    {user.name ||
                      `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {user.role.charAt(0).toUpperCase() +
                    user.role.slice(1).toLowerCase()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <w3m-button />
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <Link href="/counter">
                <Button>Counter</Button>
              </Link>
              <w3m-network-button />
            </div>
          </div>
        ) : null}

        <RegisterModal open={showRegister} onRegister={handleRegister} />
      </>
    </div>
  );
}