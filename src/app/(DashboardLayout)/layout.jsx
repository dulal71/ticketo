import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
      <div className="flex min-h-screen bg-slate-950 text-slate-200">

  <div className="shrink-0">
    <DashboardSidebar />
  </div>

 
  <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
    {children}
  </main>
</div>
    );
};

export default DashboardLayout;