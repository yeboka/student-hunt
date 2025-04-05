"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, } from "@/components/ui/sidebar"
import * as React from "react";
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Vacancies", path: "/vacancies" },
  ]

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <ul className="p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block px-3 py-2 rounded-md cursor-pointer hover:bg-white/20 mt-1 ${
                    isActive ? "bg-white/30 font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
