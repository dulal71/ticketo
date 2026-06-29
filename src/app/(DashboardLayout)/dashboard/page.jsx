import React from 'react';
// HeroUI তে CardBody-ই ব্যবহার করতে হবে
import { Card, CardBody, Chip } from '@heroui/react';
import { LuSparkles } from 'react-icons/lu';
import { getSession } from '@/lib/api/userSession';

const WelcomeHeader = async () => {
    const user = await getSession();
    const userRole = user?.role || "Organizer"; 
    const currentHour = new Date().getHours();
    
    const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

    return (
       
        <div className="flex flex-col items-center justify-center min-h-[65vh] w-full max-w-4xl mx-auto px-4">
            
            <Card 
                className="w-full bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950 text-white overflow-hidden border border-white/5 shadow-2xl rounded-3xl"
                shadow="lg"
            >

                <Card.Content className="p-8 sm:p-12 relative z-10 flex flex-col items-center text-center gap-4">
                    
                   
                    <div className="flex items-center gap-2 mb-1">
                        <Chip 
                            size="md" 
                            variant="flat" 
                            className="bg-white/10 text-white border border-white/10 backdrop-blur-md font-semibold text-xs capitalize px-3"
                        >
                            {userRole} Console
                        </Chip>
                        <span className="flex items-center gap-1.5 text-xs text-warning-400 font-medium bg-warning-500/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                            <LuSparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" /> Live Metrics
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-default-300 max-w-xl leading-tight">
                        {greeting}, <span className="text-primary-400">{user?.name || "User"}</span>!
                    </h1>
                    
                
                    <p className="text-base text-default-400 max-w-xl leading-relaxed mt-1 font-normal">
                        {userRole === "Admin" && "Monitor platform operations, verify global organizer requests, and review real-time security logs."}
                        {userRole === "Organizer" && "Monitor your ticket inventories, active published events, and review incoming transaction settlements."}
                        {userRole === "Attendee" && "View your booked ticket history, manage active event passes, and explore customized recommendations."}
                    </p>

               
                    <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[90px] pointer-events-none" />
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[90px] pointer-events-none" />
                </Card.Content>
            </Card>
            
        </div>
    );
};

export default WelcomeHeader;