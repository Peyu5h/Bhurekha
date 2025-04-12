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

  const [hasRedirected, setHasRedirected] = React.useState(false);

  React.useEffect(() => {
    if (address && address !== previousAddress) {
      setPreviousAddress(address);
      setIsRegistering(false);
      setHasRedirected(false);
    }
  }, [address, previousAddress]);

  React.useEffect(() => {
    if (
      isConnected &&
      address &&
      !isLoading &&
      user === null &&
      !isRegistering
    ) {
      setShowRegisterModal(true);

      if (!pathname.startsWith("/auth") && !hasRedirected) {
        setHasRedirected(true);
        router.push("/auth/login");
      }
    } else if (user && !isLoading) {
      setShowRegisterModal(false);

      if (!hasRedirected) {
        setHasRedirected(true);

        if (
          user.role === "SUB_REGISTRAR" &&
          !pathname.startsWith("/authority")
        ) {
          router.push("/authority");
        } else if (user.role === "USER" && pathname.startsWith("/authority")) {
          router.push("/dashboard");
        } else if (pathname.startsWith("/auth")) {
          router.push(
            user.role === "SUB_REGISTRAR" ? "/authority" : "/dashboard",
          );
        }
      }
    }
  }, [
    isConnected,
    address,
    user,
    isLoading,
    isRegistering,
    pathname,
    router,
    hasRedirected,
  ]);

  React.useEffect(() => {
    setHasRedirected(false);
  }, [pathname]);

  const handleRegister = async (values: any) => {
    try {
      setIsRegistering(true);
      await registerUser(values);
      setShowRegisterModal(false);
      setHasRedirected(false);
    } catch (error) {
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
            Loading user information...
          </p>
        </div>
        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => {
            if (pathname.startsWith("/auth")) {
              setShowRegisterModal(false);
              router.push("/");
            }
          }}
          onRegister={handleRegister}
        />
      </>
    );
  }

  return <>{children}</>;
}
