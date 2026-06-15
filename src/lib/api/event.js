'use server'

import { serverFetch } from "../service/get"
import { getSession } from "./userSession";


export const getEvents= async (organization_id)=>{
    return serverFetch(`/api/events?organization_id=${organization_id}`)
}