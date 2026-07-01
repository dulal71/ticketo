import { Button, Card } from '@heroui/react';
import React from 'react';
import { FaCalendarAlt, FaCrown, FaDollarSign, FaUsers } from 'react-icons/fa';

const OrganizerOverviewItems = () => {
     const stats = {
        totalEvents: 15,
        totalAttendees: 450,
        totalRevenue: 25000,
        totalSoldTickets: 780,
    };

    const isPremium = false;

    return (
        <div className="space-y-6 mt-6 p-5 md:p-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="glass border-white/20" radius="lg">
                    <Card.Content className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className=" text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Hosted Events</span>
                            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">{stats.totalEvents}</h2>
                        </div>
                        <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20"><FaCalendarAlt size={24} /></div>
                    </Card.Content>
                </Card>
               
                <Card className="glass border-white/20" radius="lg">
                    <Card.Content className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Ticket Sales</span>
                            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">{stats.totalAttendees}</h2>
                        </div>
                        <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20"><FaUsers size={24} /></div>
                    </Card.Content>
                </Card>
               
                <Card className="glass border-white/20" radius="lg">
                    <Card.Content className="p-6 flex flex-row items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Accumulated Revenue</span>
                            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">{`$${stats.totalRevenue.toFixed(2)}`}</h2>
                        </div>
                        <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20"><FaDollarSign size={24} /></div>
                    </Card.Content>
                </Card>
            </div>

          {!isPremium && (
    <Card
      radius="lg"
      className="
        relative overflow-hidden border border-yellow-500/20
        bg-gradient-to-r
        from-yellow-100
        via-amber-50
        to-white
        dark:from-yellow-500/5
        dark:via-amber-600/5
        dark:to-transparent
      "
    >
      <Card.Content className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <FaCrown className="text-yellow-500 dark:text-yellow-400" />
            Unlock Unlimited Event Creation
          </h3>

          <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Standard organizer accounts are limited to{" "}
            <strong className="text-slate-900 dark:text-white">
              3 events
            </strong>
            . Upgrade to our{" "}
            <strong className="text-yellow-600 dark:text-yellow-400">
              Premium Package
            </strong>{" "}
            for{" "}
            <strong className="text-slate-900 dark:text-white">
              $49.00
            </strong>{" "}
            to host unlimited events.
          </p>
        </div>

        <Button
          radius="lg"
          className="
            h-11 shrink-0 px-6
            bg-yellow-500
            text-slate-950
            font-semibold
            shadow-lg shadow-yellow-500/20
            transition-all
            duration-200
            hover:bg-yellow-400
            hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          Upgrade to Premium
        </Button>
      </Card.Content>
    </Card>
  )}
        </div>
    )
};

export default OrganizerOverviewItems;