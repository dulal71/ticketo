'use server'

import { serverFetch } from "../service/get"
import { getSession } from "./userSession";


export const getOrganization = async (organizerId) => {
    if (!organizerId) return null; 

    try {
        const data = await serverFetch(`/api/organizations?organizerId=${organizerId}`);
        
       
        if (!data) {
            return null; 
        }
        
        return data;
    } catch (error) {
        console.error("Error in getOrganization api wrapper:", error);
        return null; 
    }
}



export const getLoggedOrganizerOrganization=async()=>{
const user = await getSession()
return getOrganization(user?.id)
}