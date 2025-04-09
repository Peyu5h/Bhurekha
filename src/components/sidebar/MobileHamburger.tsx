"use client";

import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import { NavItems, UserRole } from "./config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

interface MobileHamburgerProps {
  role?: UserRole;
}

const MobileHamburger = ({ role }: MobileHamburgerProps) => {
  const [open, setOpen] = React.useState(false);
  const { logout } = useWalletAuth();
  const pathname = usePathname();
  const navItems = NavItems(role);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col space-y-1 p-6">
              {navItems
                .filter((item) => item.position === "top")
                .map((item, idx) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:bg-muted/50",
                      )}
                    >
                      {React.cloneElement(item.icon, {
                        className: cn(
                          "h-5 w-5",
                          isActive ? "text-primary" : "text-muted-foreground",
                        ),
                      })}
                      {item.name}
                    </Link>
                  );
                })}
            </nav>
          </div>
          <div className="border-t p-6">
            <nav className="flex flex-col space-y-1">
              {navItems
                .filter((item) => item.position === "bottom")
                .map((item, idx) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        isActive
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:bg-muted/50",
                      )}
                    >
                      {React.cloneElement(item.icon, {
                        className: cn(
                          "h-5 w-5",
                          isActive ? "text-primary" : "text-muted-foreground",
                        ),
                      })}
                      {item.name}
                    </Link>
                  );
                })}
            </nav>
            <div className="mt-6">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHamburger;
