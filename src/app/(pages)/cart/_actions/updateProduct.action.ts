'use server'
import { getUserToken } from "@/app/Helpers/getUserToken"
import { CartResponseI } from "@/interface"
 
export async function updateProduct(productId:string , count:number){
  const token = await getUserToken()

  const response = await fetch(`${process.env.NEXT_BASE_URL}cart/${productId}` ,{
    method : 'PUT',
    body:JSON.stringify({count}),
    headers: {
        token : token!,
      'content-type' :'application/json'
        }
  })
  const data :  CartResponseI = await response.json()
  
  return data
  
 }