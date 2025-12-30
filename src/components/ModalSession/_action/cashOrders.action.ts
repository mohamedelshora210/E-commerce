
'use server'

import { getUserToken } from "@/app/Helpers/getUserToken"
import { ShippingAddress } from "@/interface"

export async function cashOrders(cartId:string ,shippingAddress :ShippingAddress){
          const token = await getUserToken()
      
    const response = await fetch(`${process.env.NEXT_BASE_URL}orders/${cartId}`,{
    method:'POST',
    body : JSON.stringify({
        shippingAddress
    }),
    headers:{
token : token!,
            'content-type' : 'application/json'
    }
  })
  const data = await response.json()
  return data
}