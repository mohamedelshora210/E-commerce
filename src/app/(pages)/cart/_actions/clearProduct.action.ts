'use server'
import { getUserToken } from "@/app/Helpers/getUserToken"
import { CartResponseI } from "@/interface"

export async function clearProduct( ){
      const token = await getUserToken()
    
      const response = await fetch(`${process.env.NEXT_BASE_URL}cart` ,{
    method : 'DELETE',
    headers: {
token : token!,
        }
  })
  const data :  CartResponseI = await response.json()
  return data
  
 }