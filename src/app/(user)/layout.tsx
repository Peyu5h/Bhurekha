import { Metadata } from "next";
import React from "react";
import SideNav from "~/components/sidebar/SideNav";

export const metadata: Metadata = {
  title: "Bhurekha | User",
  description: "User Dashboard",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideNav role="USER">
        <div className="h-full overflow-auto">{children}</div>
      </SideNav>
    </div>
  );
}
