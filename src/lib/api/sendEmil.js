'use server'


import { serverMutation } from "../service/post"




export const sendEmail = async(data)=>{
return serverMutation('/api/send-email',data)
}