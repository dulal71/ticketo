import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div>
            <div><DashboardSidebar></DashboardSidebar></div>
         <div>{children}</div>   
        </div>
    );
};

export default DashboardLayout;