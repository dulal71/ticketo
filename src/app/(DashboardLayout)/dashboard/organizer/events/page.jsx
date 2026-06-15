import EventTable from '@/components/organizer/EventTable';
import { getEvents } from '@/lib/api/event';
import { getLoggedOrganizerOrganization } from '@/lib/api/organizations';
import React from 'react';

const Events =async () => {
    const organization=await getLoggedOrganizerOrganization()
 let events=[]
 if(organization && organization._id){
 events=await getEvents(organization._id)
 }
   
  
    return (
       <div>
    {events && events.length > 0 ? (
        <EventTable events={events} />
    ) : (
        <div className='min-h-screen flex justify-center items-center'>
           <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-default-200 rounded-xl max-w-7xl mx-auto bg-default-50">
           
            <p className="text-xl font-semibold text-default-600">No Events Available</p>
            <p className="text-sm text-default-400 mt-1">Currently, there are  events posted by this organizer.</p>
        </div> 
             </div>
        
    )}
</div>
    );
};

export default Events;