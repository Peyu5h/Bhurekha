import { usePathname } from "next/navigation";

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
      name: "Appointments",
      href: "/appointments",
      icon: <MdOutlineEvent size={20} />,
      active: isNavItemActive("/appointments"),
      position: "top",
    },
  ];
};
