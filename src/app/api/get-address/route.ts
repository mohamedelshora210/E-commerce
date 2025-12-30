import { getUserToken } from "@/app/Helpers/getUserToken"
import { DataAddressI } from "@/interface"
import { NextResponse } from "next/server"

export async function GET(){

    const token = await getUserToken()
    const response = await fetch(`${process.env.NEXT_BASE_URL}addresses`,{
        headers : {
            token : token!
        }
    })
    const data : DataAddressI = await response.json()
    return NextResponse.json(data)
}