"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import RegisterModal from "~/components/RegisterModal";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default function MainPage() {
  const { isConnected, address } = useAccount();
  const { user, registerUser, isLoading } = useWalletAuth();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [previousAddress, setPreviousAddress] = useState<string | null>(null);

  // wallet change tracker
  useEffect(() => {
    if (address && address !== previousAddress) {
      setPreviousAddress(address);
      setIsRegistering(false);
    }
  }, [address, previousAddress]);

  // registration model settings
  useEffect(() => {
    if (
      isConnected &&
      address &&
      !isLoading &&
      user === null &&
      !isRegistering
    ) {
      setShowRegisterModal(true);
    } else {
      setShowRegisterModal(false);
    }
  }, [isConnected, address, user, isLoading, isRegistering]);

  const handleRegister = async (values: any) => {
    try {
      setIsRegistering(true);
      await registerUser(values);
    } catch (error) {
      console.log("Registration error:", error);
      setIsRegistering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Bhurekha - Land Registration System
        </h1>
        <w3m-button />
      </div>

      {isLoading && (
        <div className="bg-card mb-8 rounded-lg p-6 text-center shadow-md">
          <p>Loading user information...</p>
        </div>
      )}

      {isConnected && user && (
        <div className="bg-card mb-8 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Welcome, {user.name}!</h2>
          <p className="text-muted-foreground">Role: {user.role}</p>
          <p className="text-muted-foreground">Wallet: {user.walletAddress}</p>
        </div>
      )}

      {!isConnected && (
        <div className="bg-card mb-8 rounded-lg p-6 text-center shadow-md">
          <p className="mb-4">Connect your wallet to continue</p>
        </div>
      )}

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
      />
    </div>
  );
}
