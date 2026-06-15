import OrganizationSettings from '@/components/organizer/OrganizationSettings';
import { getOrganization } from '@/lib/api/organizations';
import { getSession } from '@/lib/api/userSession';
import React from 'react';

const Settings =async () => {
  const user = await getSession()
  const organization=await getOrganization(user?.id)
  return (
    <div>
      <OrganizationSettings organizer={user} organization={organization} ></OrganizationSettings>
    </div>
  );
};

export default Settings;