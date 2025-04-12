"use client";

import React from "react";
import SideNav from "~/components/sidebar/SideNav";

export default function AuthorityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SideNav role="SUB_REGISTRAR">{children}</SideNav>;
}
