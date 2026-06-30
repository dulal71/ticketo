import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Logo from '@/components/Logo';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
      <div className=" min-h-screen dark:bg-slate-950 text-slate-200">
    
     <nav className="sticky h-[75px]  top-0 z-50 w-full border-b border-white/5 bg-slate-950/65 backdrop-blur-md py-3.5 px-6">
     <div className="flex justify-between items-center">
    <div>
      <Logo></Logo>
     </div>
    <div>
      <ThemeSwitch></ThemeSwitch>
    </div>
     </div>
     
            </nav>
  
   <div className="flex flex-col md:flex-row ">
       <div className="shrink-0">
    <DashboardSidebar />
  </div>
   <div className="flex-1 mt-[76px] ">
    {children}
  </div>
   </div>
  </div>
    );
};

export default DashboardLayout;