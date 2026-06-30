"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import { ImMenu } from "react-icons/im";
import { LuChevronLeft, LuChevronRight, LuChrome } from "react-icons/lu";

import LogoutButton from "../LogoutButton";
import { userNavLinks } from "./SidebarLinks";

const DashboardSidebar = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = userNavLinks[user?.role || "Attendee"];

  return (
    <>
      {/* ================= Desktop Sidebar ================= */}
      <aside
        className={`
          hidden md:flex flex-col h-full
          border-r border-default
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Collapse Button */}
        <div className="flex justify-end p-3">
          <Button
            isIconOnly
            variant="light"
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
              <item.icon className="size-5 shrink-0" />

              {!collapsed && (
                <span className="whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          ))}

          <div className="my-2 border-t border-default" />

          <Link
            href="/"
            className={`
              flex items-center rounded-xl px-3 py-2.5
              hover:bg-default transition-all
              ${collapsed ? "justify-center" : "gap-3"}
            `}
          >
            <LuChrome className="size-5 shrink-0" />

            {!collapsed && <span>Back to Home</span>}
          </Link>

          <LogoutButton collapsed={collapsed} />
        </nav>
      </aside>

      {/* ================= Mobile Menu ================= */}
      <Drawer>
        <div className="border-b border-default p-3 md:hidden">
          <Button
            className="w-full justify-start gap-2"
            variant="bordered"
          >
            <ImMenu className="size-4" />
            Dashboard
          </Button>
        </div>

        <Drawer.Backdrop />

        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Body>
              <nav className="flex flex-col gap-1 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-default transition-colors"
                  >
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}

                <div className="my-2 border-t border-default" />

                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-default transition-colors"
                >
                  <LuChrome className="size-5" />
                  <span>Back to Home</span>
                </Link>

                <LogoutButton />
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;