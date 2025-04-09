"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { NavItems, UserRole } from "./config";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import Header from "./Header";
import { useSidebarExpand, useSidebarActions } from "~/store/sidebarStore";

interface SideNavProps {
  role?: UserRole;
  children?: React.ReactNode;
}

export default function SideNav({ role, children }: SideNavProps) {
  const {
    data: { value: isSidebarExpanded },
  } = useSidebarExpand();
  const { toggle } = useSidebarActions();

  const [isClient, setIsClient] = useState(false);
  const { isLoading } = useWalletAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = NavItems(role);

  const toggleSidebar = () => toggle();

  if (!isClient) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {isLoading ? (
        <div className="hidden pr-4 sm:block">
          <div className="bg-background flex h-[calc(100vh-16px)] w-[270px] transform rounded-xl border transition-all duration-300 ease-in-out">
            <aside className="flex h-full w-full flex-col overflow-x-hidden px-4">
              <div className="mt-4 pb-2">
                <div className="my-4 mb-6 flex items-center justify-center">
                  <Skeleton className="h-8 w-24" />
                </div>
                <hr className="bg-muted my-4 h-[1px] w-full" />
                <nav className="flex flex-col space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <div className="hidden pr-4 sm:block">
          <div
            className={cn(
              "bg-background mt-2 ml-1 flex h-[calc(100vh-16px)] transform rounded-xl border transition-all duration-300 ease-in-out",
              isSidebarExpanded ? "w-[270px]" : "w-[68px]",
            )}
          >
            <aside className="flex h-full w-full flex-col overflow-x-hidden px-4">
              <div className="mt-4 pb-2">
                <div className="my-4 mb-6 flex items-center justify-center">
                  <h1 className="text-primary text-3xl leading-tight font-black uppercase">
                    {isSidebarExpanded ? "Bhurekha" : "B"}
                  </h1>
                </div>
                <hr className="bg-muted my-4 h-[1px] w-full" />
                <nav className="flex flex-col space-y-1">
                  {navItems.map(
                    (item, idx) =>
                      item.position === "top" && (
                        <SideNavItem
                          key={idx}
                          {...item}
                          isSidebarExpanded={isSidebarExpanded}
                          exactMatch={item.href === "/authority"}
                        />
                      ),
                  )}
                </nav>
              </div>
              <div className="mt-auto mb-4">
                {navItems.map(
                  (item, idx) =>
                    item.position === "bottom" && (
                      <SideNavItem
                        key={idx}
                        {...item}
                        isSidebarExpanded={isSidebarExpanded}
                        exactMatch={item.href === "/authority"}
                      />
                    ),
                )}
              </div>
            </aside>
            <button
              type="button"
              className="border-muted-foreground/20 bg-accent absolute right-[-12px] bottom-32 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
              onClick={toggleSidebar}
            >
              {isSidebarExpanded ? (
                <ChevronLeft size={16} className="stroke-foreground" />
              ) : (
                <ChevronRight size={16} className="stroke-foreground" />
              )}
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header role={role} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

const SideNavItem = ({
  name,
  icon,
  href,
  isSidebarExpanded,
  exactMatch,
}: any) => {
  const pathname = usePathname();
  const isActive = exactMatch ? pathname === href : pathname.startsWith(href);

  const content = (
    <div
      className={cn(
        "flex items-center rounded-md px-2 py-2",
        isActive
          ? "bg-secondary text-primary shadow-sm"
          : "text-secondary-foreground/50 hover:bg-muted/50",
      )}
    >
      <div className="flex min-w-[24px] items-center">
        {React.cloneElement(icon, {
          className: cn(
            "h-[20px] w-[20px]",
            isActive ? "text-primary" : "text-muted-foreground",
          ),
        })}
      </div>
      {isSidebarExpanded && (
        <span className="ml-2 truncate text-sm font-medium">{name}</span>
      )}
    </div>
  );

  return isSidebarExpanded ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="block">
            {content}
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="px-3 py-1.5 text-xs"
          sideOffset={10}
        >
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
