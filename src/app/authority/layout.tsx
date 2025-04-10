import { Metadata } from "next";
import React from "react";
import SideNav from "~/components/sidebar/SideNav";

export const metadata: Metadata = {
  title: "Bhurekha | Authority",
  description: "Authority Dashboard",
};

export default function AuthorityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideNav role="SUB_REGISTRAR">{children}</SideNav>;
}
