'use server'

import { formSchema } from "@/app/(pages)/signup/page";
import {z} from "zod";

export async function PostRegister(values:  z.infer<typeof formSchema>){
    const response = await fetch(`${process.env.NEXT_BASE_URL}auth/signup` , {
        method : 'POST',
        body : JSON.stringify(values),
        headers : {
            'content-type' : 'application/json'
        }
    })
    const data = await response.json()
    return data
    
}
