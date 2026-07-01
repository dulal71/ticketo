"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = ({setDropdownOpen = null , collapsed = false}) => {
    const router = useRouter()
    const handleLogout = async () => {
    try {
      await authClient.signOut();
      

      if (typeof setDropdownOpen === "function") {
        setDropdownOpen(false);
      }
      
      alert("Logged Out! (Design Only)");
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
    return (
       <button
  onClick={handleLogout}
  className={`
    flex w-full items-center rounded-xl px-3 py-2.5
    hover:bg-default transition-all
    ${collapsed ? "justify-center" : "gap-3"}
  `}
>
  <FaSignOutAlt className="size-5 shrink-0 text-danger" />

  {!collapsed && (
    <span className="text-danger font-medium">
      Log Out
    </span>
  )}
</button>
    );
};

export default LogoutButton;