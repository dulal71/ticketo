
import { getSession } from "@/lib/api/userSession";
import { LuLayoutDashboard, LuUser, LuCalendarDays, LuSettings, LuCalendar, LuHistory, LuCirclePlus, LuLogOut, LuChrome } from "react-icons/lu";
import { MdOutlineCreditCard } from "react-icons/md";
import { FiUsers, FiClipboard } from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5";
import {Button, Drawer} from "@heroui/react";

import Link from "next/link";
import Logo from "../Logo";
import { ImMenu } from "react-icons/im";
import Image from "next/image";

const DashboardSidebar =async () => {
  const user = await getSession()
const attendeeLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard/attendee", label: "Overview Stats" },
  { icon: LuUser, href: "/dashboard/attendee/profile", label: "Profile Update" },
  { icon: LuCalendarDays, href: "/dashboard/attendee/bookings", label: "Booking History" },
  { icon: MdOutlineCreditCard, href: "/dashboard/attendee/payments", label: "Payment History" },
];

const organizerLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard/organizer", label: "Overview" },
  { icon: LuSettings, href: "/dashboard/organizer/settings", label: "Organization Settings" },
  { icon: LuCirclePlus, href: "/dashboard/organizer/events/new", label: "Add Event" },
  { icon: LuCalendar, href: "/dashboard/organizer/events", label: "Manage Events" },
  { icon: FiClipboard, href: "/dashboard/organizer/bookings", label: "Booking List per Event" },
];

const adminLinks = [
  { icon: LuLayoutDashboard, href: "/dashboard/admin", label: "Platform Overview Stats" },
  { icon: FiUsers, href: "/dashboard/admin/users", label: "User Management" },
  { icon: LuSettings, href: "/dashboard/admin/moderation", label: "Event Moderation" },
  { icon: LuHistory, href: "/dashboard/admin/transactions", label: "Transaction History" },
  { icon: IoBarChartOutline, href: "/dashboard/admin/analytics", label: "System Analytics" },
];
const userNavLinks = {
  Admin: adminLinks,
  Attendee: attendeeLinks,
  Organizer: organizerLinks
};
const navItems=userNavLinks[user?.role || 'seeker']
  const navLink=<>
  <div className="mt-auto py-5 border-b border-default  flex items-center gap-3 px-3">
      {user?.image ? (
  <Image
    width={60} 
    height={60}
    src={user.image} 
    alt={user?.name || "User"} 
   
    className="size-15 rounded-full object-cover border border-default"
  />
) : (
  
  <div className="size-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-lg">
    {user?.name ? user.name[0].toUpperCase() : "U"}
  </div>
)}
      
      <div className="flex flex-col min-w-0">
        <span className="text-xl font-medium text-foreground truncate">
          {user?.name || "User Name"}
        </span>
        <span className="text-md text-muted truncate">
          {user?.role }
        </span>
      </div>
    </div>
  <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-default/50" />
               
                <Link
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        href="/"
      >
        <LuChrome className="size-5 text-muted" />
        Back to Home
      </Link>

      {/* Sign Out Button/Link */}
   
      <Link
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors"
        href="/" 
      >
        <LuLogOut className="size-5" />
        Sign Out
      </Link>
              </nav>
  </>
    return (
        <>
        <div className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/65 backdrop-blur-md py-3.5 px-6">
 <Logo></Logo>
        </div>
       
        <aside className="hidden w-64 min-h-screen shrink-0 border-r border-default p-4 lg:block">
            {navLink}
        </aside>
        <Drawer>
          <div className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/65 backdrop-blur-md py-3.5 px-6">

<Button className="lg:hidden rounded-none" variant="outline" >
       <ImMenu></ImMenu>
        Menu
      </Button>
          </div>
      
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
           
            <Drawer.Body >
              {navLink}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
        </>
        
    );
};

export default DashboardSidebar;