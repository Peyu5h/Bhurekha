import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Web3Provider from "~/lib/middleware/Web3Provider";
import ReactQueryProvider from "~/lib/middleware/ReactQueryProvider";
import { Metadata } from "next";
import ClientLayout from "~/components/layouts/ClientLayout";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem>
          <ReactQueryProvider>
            <Web3Provider cookies={null}>
              <ClientLayout>{children}</ClientLayout>
              <Toaster />
            </Web3Provider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
