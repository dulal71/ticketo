import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Logo from '@/components/Logo';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { getSession } from '@/lib/api/userSession';


const DashboardLayout =async ({children}) => {
     const user = await getSession()
  return (
      <section className=" min-h-screen flex flex-col dark:bg-slate-950 text-slate-200">
    {/* Header */}
     <header>
  <nav className="sticky top-0 z-50 h-16 w-full border-b border-default bg-white/80 dark:bg-slate-950/70 backdrop-blur-lg shadow-sm transition-colors duration-300 ">
    <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8">
      <Logo />
      <ThemeSwitch />
    </div>
  </nav>
</header>

       {/* Main content */}
   <main className="flex flex-col md:flex-row ">
       <div className="shrink-0">
    <DashboardSidebar user={user} />
  </div>
   <div className="flex-1 pt-16 ">
    {children}
  </div>
   </main>
  </section>
    );
};

export default DashboardLayout;