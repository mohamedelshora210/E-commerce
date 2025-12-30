'use server'

import {z} from "zod";
import { formSchema } from "../resetPassword";


type InputField = z.infer<typeof formSchema>

export async function resetPassword(values : InputField){
    const response = await fetch(`${process.env.NEXT_BASE_URL}auth/resetPassword` , {
        method : 'PUT',
        body : JSON.stringify({
            email : values.email,
            newPassword : values.newPassword
        }),
        headers : {
            'content-type' :'application/json'
        }
    })
    const data = await response.json()
    
    return data
    
}