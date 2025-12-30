'use server'

import {z} from "zod";
import { formSchema } from "../VerifyCode";


type InputField = z.infer<typeof formSchema>

export async function verifyResetCode(values : InputField){
    const response = await fetch(`${process.env.NEXT_BASE_URL}auth/verifyResetCode` , {
        method : 'POST',
        body : JSON.stringify({
            resetCode : values.resetCode
        }),
        headers : {
            'content-type' :'application/json'
        }
    })
    const data = await response.json()
    
    return data
}