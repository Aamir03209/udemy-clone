'use client'
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./Sidebar-item";
import { usePathname } from "next/navigation";
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/Search",
  },
];
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
export const SidebarRoutes = () => {
  const pathname=usePathname()
  const isTeacherPage = pathname.includes('/teacher')
  const routes = isTeacherPage?teacherRoutes:guestRoutes;
 return (
    routes.map((route) => (
        <SidebarItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))
 )
};
