'use server'
import { getUserToken } from "@/app/Helpers/getUserToken"
import { CartResponseI } from "@/interface"

export async function removeProduct(productId:string ){
        const token = await getUserToken ()
    
  const response = await fetch(`${process.env.NEXT_BASE_URL}cart/${productId}` ,{
    method : 'DELETE',
    headers: {
token : token!,       
 }
  })
  const data :  CartResponseI = await response.json()
  return data
  
 }
