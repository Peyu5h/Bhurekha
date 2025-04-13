import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Web3Provider from "~/lib/middleware/Web3Provider";
import ReactQueryProvider from "~/lib/middleware/ReactQueryProvider";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import AuthLayout from "~/components/auth/AuthLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bhurekha",
  description: "AI-Powered Blockchain Land Registry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`scrollbar ${inter.className}`} suppressHydrationWarning>
        <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
          <ReactQueryProvider>
            <Web3Provider cookies={null}>
              <AuthLayout>{children}</AuthLayout>
              <Toaster />
            </Web3Provider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
