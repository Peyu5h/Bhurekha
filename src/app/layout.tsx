"use client";

import React from "react";
import { Toaster } from "sonner";
import AuthWrapper from "~/components/auth/AuthWrapper";
import Web3Provider from "~/lib/middleware/Web3Provider";
import "./globals.css";
import { ThemeProvider } from "~/components/providers/theme-provider";
import ReactQueryProvider from "~/lib/middleware/ReactQueryProvider";
import { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-background min-h-screen font-sans antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Web3Provider cookies={null}>
              {mounted ? (
                <AuthWrapper>{children}</AuthWrapper>
              ) : (
                <div className="flex min-h-screen items-center justify-center">
                  <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
                </div>
              )}
              <Toaster />
            </Web3Provider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
