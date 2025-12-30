'use server'
import { getUserToken } from "@/app/Helpers/getUserToken"
import {z} from "zod"
import { formSchema } from "./UpdateData";


export async function updateData(values : z.infer<typeof formSchema>){

    const token = await getUserToken()

    const response = await fetch(`${process.env.NEXT_BASE_URL}users/updateMe/`,{
        method:'PUT',
        body:JSON.stringify({
            name : values.name,
            email : values.email,
            phone : values.phone
        }),
        headers : {
            token : token!,
            'content-type' : 'application/json'
        }
    })
    const data = await response.json()
    return data
}