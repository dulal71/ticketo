import AddEventForm from "@/components/organizer/AddEventForm";
import { getLoggedOrganizerOrganization } from "@/lib/api/organizations";


const AddNewEvent =async () => {
    const organization=await getLoggedOrganizerOrganization()
    return (
        <div>()
          <AddEventForm organization={organization}></AddEventForm>  
        </div>
    );
};

export default AddNewEvent;