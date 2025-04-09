import React from "react";
import SideNav from "~/components/sidebar/SideNav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideNav role="USER">{children}</SideNav>;
}
