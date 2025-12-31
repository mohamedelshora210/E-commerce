'use client'
import { Loader2, MapPinHouse, Trash} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataAddressI } from '@/interface'

import AddAddress from './AddAddress/AddAddress'
import { removeAddress } from './RemoveAddress'
import toast from 'react-hot-toast'

export default function Address() {
    const [addressData, setAddressData] = useState< DataAddressI| null>(null)
    const [removingId, setRemovingId] = useState<string | null>(null)
    async function Address(){
        const response = await fetch(`/api/get-address`)
        const data  = await response.json()
        setAddressData(data)
    }
    
    async function deleteAddress(id : string){
        setRemovingId(id)
        const data = await removeAddress(id)
        if(data.status=='success')
        {
            toast.success(data.message)
            setAddressData(data)
        }
        setRemovingId(null)

    }
    useEffect(()=>{
      Address()
    },[])
  return (
    <>
        <div className='flex items-center '>
            <div className='my-4 relative  py-3 grow '>
                <h2 className=' text-xl text-teal-800 font-bold absolute  top-0 start-1/2 -translate-x-1/2 z-2 peer'>Your address</h2>
                <MapPinHouse strokeWidth={3.5} className='text-gray-400 w-8 h-8 absolute top-0 start-1/2 -translate-x-1/2 duration-150 
                 peer-hover:text-gray-500
                 peer-hover:scale-110
                 peer-hover:-translate-y-1 '/>
            </div>

            <AddAddress setAddressData={setAddressData}/>
        </div>
        {!addressData ? <div className='min-h-75 flex items-center justify-center'><Loader2 className='animate-spin text-teal-700 w-15 h-15'/></div> 
        : 
        addressData.data.length == 0 ? <div className='text-muted-foreground font-semibold flex items-center justify-center min-h-75'><p>No products found in your orders</p></div> 
    :
            addressData.data.map((address)=>
            <Card key={address._id} className='hover:shadow-teal-800 duration-150 mb-2 -space-y-4 py-3'>
            <CardHeader>
                <div className='flex items-center justify-between'>
                <CardTitle className='text-teal-900 font-bold'>{address.city}</CardTitle>
                <p><span className='font-semibold'>Phone :</span> {address.phone}</p>
                </div>
            </CardHeader>
            <CardContent className='flex items-center justify-between'>
                <div>
                <p><span className='font-semibold'>Street :</span>  {address.name}</p>
                <p><span className='font-semibold'>Datails :</span> {address.details}</p>
                </div>
                {removingId == address._id ? <Loader2 className='animate-spin text-red-600' strokeWidth={2.5}/> : <Trash className='text-red-600 cursor-pointer hover:scale-110 duration-200' strokeWidth={2.5} onClick={()=>deleteAddress(address._id)}/>}
            </CardContent>

        </Card>)
    }

    </>
  )
}
