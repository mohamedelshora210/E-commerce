
import { getUserToken } from "@/app/Helpers/getUserToken";
import { OrderI } from "@/interface";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";


export async function GET(){
    const token = await getUserToken()
    
    const {id} : {id : string} = jwtDecode(token!)

    
    const response = await fetch(`${process.env.NEXT_BASE_URL}orders/user/${id}`)
    const data : OrderI = await response.json()
    return NextResponse.json(data)
}