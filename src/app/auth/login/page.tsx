"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect } from "wagmi";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Wallet } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Bhurekha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-center">
            {" "}
            <w3m-connect-button />
          </div>
          <p className="text-muted-foreground mt-4 text-center text-sm">
            Connect your wallet to access the platform
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
