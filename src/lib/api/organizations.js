'use server'

import { serverFetch } from "../service/get"

export const getOrganization=async(organizerId)=>{
    return serverFetch(`/api/organizations?organizerId=${organizerId}`)
}