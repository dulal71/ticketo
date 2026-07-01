"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import { ImMenu } from "react-icons/im";
import { LuChevronLeft, LuChevronRight, LuChrome } from "react-icons/lu";

import LogoutButton from "../LogoutButton";
import { userNavLinks } from "./SidebarLinks";
import { FaRegWindowClose } from "react-icons/fa";

const DashboardSidebar = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
   const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = userNavLinks[user?.role || "Attendee"];

  return (
    <>
      {/* ================= Desktop Sidebar ================= */}
      <aside
        className={`
          hidden md:flex flex-col h-screen
          border-r border-default
          transition-all duration-600 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Collapse Button */}
        <div className="flex justify-end p-3">
          <Button
            isIconOnly
            variant="light"
            className={'text-black dark:text-white'}
            onPress={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center rounded-xl px-3 py-2.5
                hover:bg-default transition-all
                ${collapsed ? "justify-center" : "gap-3"}
              `}
            >
              <item.icon className="size-5 shrink-0 text-black dark:text-white" />

              {!collapsed && (
                <span className="whitespace-nowrap text-black dark:text-white font-semibold">
                  {item.label}
                </span>
              )}
            </Link>
          ))}

          <div className="my-2 border-t border-default" />

          <Link
            href="/"
            className={`
             text-black dark:text-white font-semibold flex items-center rounded-xl px-3 py-2.5
              hover:bg-default transition-all
              ${collapsed ? "justify-center" : "gap-3"}
            `}
          >
            <LuChrome className="size-5 shrink-0 " />

            {!collapsed && <span>Back to Home</span>}
          </Link>

          <LogoutButton collapsed={collapsed} />
        </nav>
      </aside>

      {/* ================= Mobile Menu ================= */}
     <div className="md:hidden border-b border-default p-3">
  <Button
    onPress={() => setMobileOpen(!mobileOpen)}
    className="w-full justify-start text-black dark:text-white"
    variant="bordered"
  >
    {
      mobileOpen ? <FaRegWindowClose className="size-4"/>: <ImMenu className="size-4" />
    }
    
    Dashboard
  </Button>
</div>

{/* Mobile Sidebar */}
<div
  className={`
    md:hidden
    overflow-hidden
    transition-all duration-300
    ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
  `}
>
  <nav className="border-b rounded-2xl border-default p-3">
    {navItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className="flex items-center font-semibold text-black dark:text-white gap-3 rounded-xl px-3 py-2.5 hover:bg-default transition-colors"
      >
        <item.icon className="size-5 " />
        <span >{item.label}</span>
      </Link>
    ))}

    <div className="my-2 border-t border-default" />

    <Link
      href="/"
      className="flex items-center font-semibold text-black dark:text-white gap-3 rounded-xl px-3 py-2.5 hover:bg-default transition-colors"
    >
      <LuChrome className="size-5" />
      <span>Back to Home</span>
    </Link>

    <LogoutButton />
  </nav>
</div> 
     
    </>
  );
};

export default DashboardSidebar;