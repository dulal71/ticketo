'use server'

import { serverMutation } from "../service/post"

export const  addOrganization=async(organizationData)=>{
return serverMutation('/api/organizations',organizationData)
}