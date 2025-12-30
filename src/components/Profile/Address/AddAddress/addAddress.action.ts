'use server'

import { getUserToken } from "@/app/Helpers/getUserToken"
import { AddressI, DataAddressI } from "@/interface"

export async function addAddress(dataAddress : AddressI){

    const token = await getUserToken()
    const response = await fetch(`${process.env.NEXT_BASE_URL}addresses`, {
        method : 'POST',
        body : JSON.stringify({
            name : dataAddress.name , 
            phone : dataAddress.phone , 
            details : dataAddress.details ,
            city : dataAddress.city
        }),
        headers : {
            token : token!,
            'content-type' : 'application/json'
        }
    })
    const data : DataAddressI = await response.json()
    return data
}