import { getUserToken } from "@/app/Helpers/getUserToken"
import { CartResponseI } from "@/interface"
import { NextResponse } from "next/server"

export async function GET(){
          const token = await getUserToken()
    
    const response = await fetch(`${process.env.NEXT_BASE_URL}wishlist` , {
  headers : {
      token : token!,
  }
})
const data : CartResponseI = await response.json()
return NextResponse.json(data)
}