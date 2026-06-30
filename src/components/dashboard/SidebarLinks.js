
import { LuLayoutDashboard, LuUser, LuCalendarDays, LuSettings, LuCalendar, LuHistory, LuCirclePlus, LuLogOut, LuChrome } from "react-icons/lu";
import { MdOutlineCreditCard } from "react-icons/md";
import { FiUsers, FiClipboard } from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5";


  //  Attendee Dashboard Link
const attendee = [
  { icon: LuLayoutDashboard, href: "/dashboard/attendee", label: "Overview Stats" },
  { icon: LuUser, href: "/dashboard/attendee/profile", label: "Profile Update" },
  { icon: LuCalendarDays, href: "/dashboard/attendee/bookings", label: "Booking History" },
  { icon: MdOutlineCreditCard, href: "/dashboard/attendee/payments", label: "Payment History" },
];
 //  Organizer Dashboard Link
const organizer = [
  { icon: LuLayoutDashboard, href: "/dashboard/organizer", label: "Overview" },
   { icon: LuCirclePlus, href: "/dashboard/organizer/add-organization", label: "Add Organization"},
  { icon: LuSettings, href: "/dashboard/organizer/settings", label: "Organization Settings" },
  { icon: LuCirclePlus, href: "/dashboard/organizer/events/new-event", label: "Add Event" },
  { icon: LuCalendar, href: "/dashboard/organizer/events", label: "Manage Events" },
  { icon: FiClipboard, href: "/dashboard/organizer/bookings", label: "Booking List per Event" },
];
 //  Admin Dashboard Link
const admin = [
  { icon: LuLayoutDashboard, href: "/dashboard/admin", label: "Platform Overview Stats" },
  { icon: FiUsers, href: "/dashboard/admin/users", label: "User Management" },
  { icon: LuSettings, href: "/dashboard/admin/moderation", label: "Event Moderation" },
  { icon: LuHistory, href: "/dashboard/admin/transactions", label: "Transaction History" },
  { icon: IoBarChartOutline, href: "/dashboard/admin/analytics", label: "System Analytics" },
];


export const userNavLinks = {
  admin: admin,
  Attendee: attendee,
  Organizer: organizer
};