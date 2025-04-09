import React from "react";
import { useAccount } from "wagmi";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import RegisterModal from "~/components/RegisterModal";
import { useRouter, usePathname } from "next/navigation";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isConnected, address } = useAccount();
  const { user, registerUser, isLoading } = useWalletAuth();
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [previousAddress, setPreviousAddress] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    if (address && address !== previousAddress) {
      setPreviousAddress(address);
      setIsRegistering(false);
    }
  }, [address, previousAddress]);

  React.useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "SUB_REGISTRAR") {
        if (!pathname.startsWith("/authority")) {
          router.push("/authority");
          return;
        }
      } else if (user.role === "USER") {
        if (pathname === "/") {
          router.push("/dashboard");
          return;
        }
        if (pathname.startsWith("/authority")) {
          router.push("/dashboard");
          return;
        }
      }
    }
  }, [user, isLoading, router, pathname]);

  React.useEffect(() => {
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

  if (!isConnected) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="mb-8 text-4xl font-bold">Welcome to Bhurekha</h1>
        <p className="text-muted-foreground mb-8 text-center text-lg">
          Connect your wallet to access the land registration system
        </p>
        <w3m-button />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <p className="text-lg">Loading user information...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
          <h1 className="mb-8 text-4xl font-bold">Welcome to Bhurekha</h1>
          <p className="text-muted-foreground mb-8 text-center text-lg">
            Please complete registration to continue
          </p>
        </div>
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegister}
        />
      </>
    );
  }

  return <>{children}</>;
}
