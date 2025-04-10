"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import { NavItems, UserRole } from "./config";
import { buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";

interface SideNavProps {
  role?: UserRole;
  children?: React.ReactNode;
}

export default function SideNav({ role = "USER", children }: SideNavProps) {
  const [mounted, setMounted] = useState(false);
  const { isLoading, user, logout } = useWalletAuth();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = NavItems(role);

  // Only render client-side content after mounting
  if (!mounted) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="bg-muted/40 hidden w-64 border-r sm:block">
          <div className="flex h-full flex-col">
            <div className="my-4 flex items-center justify-center">
              <Skeleton className="h-8 w-24" />
            </div>
            <nav className="px-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="mb-2 h-10 w-full" />
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="h-full overflow-y-auto p-4">
            <div className="animate-pulse space-y-4">
              <div className="bg-muted h-8 w-1/3 rounded" />
              <div className="bg-muted h-32 rounded" />
              <div className="bg-muted h-32 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="bg-muted/40 flex w-16 flex-col justify-between border-r md:w-64">
        <div className="flex flex-col space-y-2 py-4">
          <div className="flex h-12 items-center justify-center md:h-14">
            <Link
              href="/"
              className="font-display text-xl font-bold md:text-2xl"
            >
              <span className="hidden md:inline">Bhurekha</span>
              <span className="inline md:hidden">B</span>
            </Link>
          </div>

          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "justify-start",
                    isActive && "bg-muted font-medium",
                    "h-10",
                  )}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {!isLoading && user && (
          <div className="px-2 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-muted/30 hover:bg-muted/50 flex w-full items-center gap-2 rounded-md px-2 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden flex-1 overflow-hidden text-left md:block">
                  <p className="truncate text-sm font-medium">{user?.name}</p>
                  <p className="text-muted-foreground truncate text-[10px]">
                    {user?.walletAddress?.substring(0, 6)}...
                    {user?.walletAddress?.substring(38)}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
