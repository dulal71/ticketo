'use server'

import { serverMutation } from "../service/post"

export const  addEvent=async(eventData)=>{
return serverMutation('/api/events',eventData)
}