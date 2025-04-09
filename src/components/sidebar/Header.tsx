"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MobileHamburger from "./MobileHamburger";
import { UserRole } from "./config";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  role?: UserRole;
}

const Header = ({ role }: HeaderProps) => {
  const { user, logout, isLoading } = useWalletAuth();

  if (isLoading) {
    return (
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 backdrop-blur">
        <div className="flex w-full items-center justify-between px-4 py-4">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background/20 sticky top-0 z-50">
      <div className="flex w-full items-center justify-between px-4 py-4">
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-muted/30 hover:bg-muted/40 flex w-48 items-center justify-between gap-2 rounded-full px-2 py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-muted-foreground text-[10px]">
                      {user?.mobileNumber || "No mobile"}
                    </span>
                  </div>
                </div>
                <ChevronDown className="mr-2 ml-2 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => logout()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="block sm:hidden">
            <MobileHamburger role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
