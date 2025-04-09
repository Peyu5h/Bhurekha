import { usePathname } from "next/navigation";

import { Settings } from "lucide-react";
import {
  MdSpaceDashboard,
  MdOutlineHome,
  MdOutlineSearch,
  MdOutlineFolder,
  MdOutlineEvent,
  MdOutlineVerified,
} from "react-icons/md";

export type UserRole = "USER" | "SUB_REGISTRAR";

export const NavItems = (role?: UserRole) => {
  const pathname = usePathname();

  function isNavItemActive(nav: string) {
    return pathname === nav || pathname.startsWith(nav);
  }

  if (role === "SUB_REGISTRAR") {
    return [
      {
        name: "Dashboard",
        href: "/authority",
        icon: <MdSpaceDashboard size={20} />,
        active: isNavItemActive("/authority"),
        position: "top",
      },
      {
        name: "Verifications",
        href: "/authority/verifications",
        icon: <MdOutlineVerified size={20} />,
        active: isNavItemActive("/authority/verifications"),
        position: "top",
      },
      {
        name: "Appointments",
        href: "/authority/appointments",
        icon: <MdOutlineEvent size={20} />,
        active: isNavItemActive("/authority/appointments"),
        position: "top",
      },
      {
        name: "Settings",
        href: "/authority/settings",
        icon: <Settings size={18} />,
        active: isNavItemActive("/authority/settings"),
        position: "bottom",
      },
    ];
  }

  return [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <MdSpaceDashboard size={20} />,
      active: isNavItemActive("/"),
      position: "top",
    },
    {
      name: "My Properties",
      href: "/properties",
      icon: <MdOutlineHome size={20} />,
      active: isNavItemActive("/properties"),
      position: "top",
    },
    {
      name: "Search Properties",
      href: "/search",
      icon: <MdOutlineSearch size={20} />,
      active: isNavItemActive("/search"),
      position: "top",
    },
    {
      name: "Document Vault",
      href: "/documents",
      icon: <MdOutlineFolder size={20} />,
      active: isNavItemActive("/documents"),
      position: "top",
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: <MdOutlineEvent size={20} />,
      active: isNavItemActive("/appointments"),
      position: "top",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings size={18} />,
      active: isNavItemActive("/settings"),
      position: "bottom",
    },
  ];
};
