'use server'

import { getUserToken } from "@/app/Helpers/getUserToken"

export async function AddToCart(productId:String){

    const token = await getUserToken()
    const response = await fetch(`${process.env.NEXT_BASE_URL}cart`,{
        method:'POST',
        body:JSON.stringify({productId}),
        headers: {
            token : token!,
            'content-type' :'application/json'
        }
    })
    const data = await response.json()
    
    return data
}