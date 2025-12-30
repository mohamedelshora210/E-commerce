'use server'

import { BrandI } from "@/interface"
import { ParamValue } from "next/dist/server/request/params"

export async function getProductsApi(keyWord : string){
    return await fetch(`${process.env.NEXT_BASE_URL}${keyWord}`)
    
}

export async function getSpecific(keyWord : string , id :ParamValue){
    const response = await fetch(`${process.env.NEXT_BASE_URL}${keyWord}/${id}`)
    const {data} : {data : BrandI} = await response.json()
    return data
}