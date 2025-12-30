'use server'

import {z} from "zod";
import { formSchema } from "../ForgetPassword";

type InputField = z.infer<typeof formSchema>

export async function forgetPassword(values : InputField){
    const response = await fetch(`${process.env.NEXT_BASE_URL}auth/forgotPasswords` , {
        method : 'POST',
        body : JSON.stringify({
            email : values.email
        }),
        headers : {
            'content-type' :'application/json'
        }
    })
    const data = await response.json()
    return data
}