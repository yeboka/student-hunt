"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, } from "@/components/ui/sidebar"
import * as React from "react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    {name: "Home", path: "/"},
    {name: "Students", path: "/students"},
    {name: "Vacancies", path: "/vacancies"},
    {name: "My Applications", path: "/applications"},
  ];

  const [user, setUser] = useState<{ first_name: string; last_name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Запрос на получение данных профиля пользователя
      fetch("https://studenthuntback-production.up.railway.app/api/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.text()) // Сначала получаем текстовый ответ
        .then((data) => {
          try {
            const jsonData = JSON.parse(data); // Пробуем преобразовать текст в JSON
            if (jsonData.first_name && jsonData.last_name) {
              setUser(jsonData);
            }
          } catch (err) {
            console.error("Invalid JSON response:", data, err); // Если не JSON, выводим текст ошибки
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);

  // Навигационные элементы
  return (
    <Sidebar>
      <SidebarHeader/>
      <SidebarContent>
        <ul className="p-3">
          {navItems.map((item, idx) => {
            if (idx === navItems.length - 1) return <React.Fragment key={item.path}></React.Fragment>
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
          {user && <Link
              href={navItems[navItems.length-1].path}
              className={`block px-3 py-2 rounded-md cursor-pointer hover:bg-white/20 mt-1 ${
                pathname === navItems[navItems.length-1].path ? "bg-white/30 font-semibold" : ""
              }`}
          >
            {navItems[navItems.length-1].name}
          </Link>}
        </ul>
      </SidebarContent>
      <SidebarFooter/>
    </Sidebar>
  )
}
