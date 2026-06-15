// components/organizer/OrganizationForm.js
'use client';

import React from 'react';
import CreateOrganizationForm from './CreateOrganizationForm';
import UpdateOrganizationForm from './UpdateOrganizationForm';

const OrganizationForm = ({ organizer, initialOrganization }) => {
   
    if (initialOrganization && Object.keys(initialOrganization).length > 0) {
        return (
            <UpdateOrganizationForm
                organizer={organizer} 
                initialOrganization={initialOrganization} 
            />
        );
    }

    return (
        <CreateOrganizationForm 
            organizer={organizer} 
        />
    );
};

export default OrganizationForm;