import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-200">

  <div className="shrink-0">
    <DashboardSidebar />
  </div>

 
  <div className="flex-1 mt-[76px] ">
    {children}
  </div>
</div>
    );
};

export default DashboardLayout;