
'use server'
import { getUserToken } from "@/app/Helpers/getUserToken"
import {z} from "zod"
import { formSchema } from "./UpdatePassword"



export async function updatePassword(values : z.infer<typeof formSchema>){

    const token = await getUserToken()

    const response = await fetch(`${process.env.NEXT_BASE_URL}users/changeMyPassword`,{
        method:'PUT',
        body:JSON.stringify({
            currentPassword : values.currentPassword,
            password : values.newPassword,
            rePassword : values.rePassword
        }),
        headers : {
            token : token!,
            'content-type' : 'application/json'
        }
    })
    const data = await response.json()
    return data
}