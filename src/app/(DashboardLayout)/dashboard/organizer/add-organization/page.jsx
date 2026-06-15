import OrganizationForm from "@/components/organizer/OrganizationForm";
import { getOrganization } from "@/lib/api/organizations";
import { getSession } from "@/lib/api/userSession";



const AddOrganizations =async () => {
    const user =await getSession()
     const organization=await getOrganization(user?.id)
     
    return (
        <div className="md:mt-6 p-5 md:p-10">
          <OrganizationForm organizer={user} initialOrganization={organization}></OrganizationForm> 
        </div>
    );
};

export default  AddOrganizations ;