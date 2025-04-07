
import "./globals.css";
import { Toaster } from "sonner";
import Web3Provider from "~/lib/middleware/Web3Provider";
import { headers } from "next/headers";
import ReactQueryProvider from "~/lib/middleware/ReactQueryProvider";
import { ThemeProvider } from "next-themes";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = (await headers()).get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background dark min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Web3Provider cookies={null}>
              {children}
              <Toaster />
            </Web3Provider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}