import { getEvents } from '@/lib/api/event';
import { getLoggedOrganizerOrganization } from '@/lib/api/organizations';
import React from 'react';

const Events =async () => {
    const organization=await getLoggedOrganizerOrganization()
    console.log(organization._id);
   const events=await getEvents(organization._id)
   console.log(events);
    return (
        <div>
            <h1>all event</h1>
        </div>
    );
};

export default Events;