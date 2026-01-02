'use client'
import React, {  useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OrderI } from '@/interface'
import { CircleStar, Loader2 } from 'lucide-react'
import OrderItems from '@/components/OrderItems/OrderItems'


export default  function AllOrders() {
const [itemsOrder, setItemsOrder] = useState<OrderI[] | null>(null)

async function Orders(){
    const response = await fetch(`/api/get-allorders`)
    const data  = await response.json()
    setItemsOrder(data)
}

useEffect(()=>{
  Orders()
},[])

    const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const dateStr = date.toLocaleDateString('en-GB'); 
    const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' , hour12:true }); 
    return `${dateStr} , ${timeStr}`; 
  }
  return (
    <>
    
    <div className='container mx-auto'>
    <div className='my-5'>
      <h2 className='text-3xl font-bold flex gap-2 items-center'><span>All Orders</span> <CircleStar className='text-yellow-500' strokeWidth={3}/></h2>
    </div>
        {!itemsOrder ? (<div className='min-h-75 flex items-center justify-center'><Loader2 className='animate-spin text-teal-700 w-15 h-15'/></div>)
        : itemsOrder.length == 0 ? (<div className='text-muted-foreground font-semibold flex items-center justify-center min-h-75'><p>No products found in your orders</p></div>)
         : 
        ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ms-3">
          {itemsOrder.map((item)=>
            <Card key={item._id} className='-space-y-2'>
                    <CardHeader>
                        <CardTitle className='text-xl font-bold text-teal-900'> Order #{item.id}</CardTitle>
                         <CardAction >{item.isPaid ? <span className='text-green-600 font-semibold'>Paid</span>: <span className='text-red-600 font-semibold'>Not Paid</span>}</CardAction>
                       <div className='space-y-2'>
                         <CardDescription> Date : {formatDateTime(item.createdAt) }</CardDescription>
                        <CardDescription> Delivered : {item.isDelivered ? <span className='text-green-600 font-semibold'>Yes</span>: <span className='text-red-600 font-semibold'>No</span>}</CardDescription>
                        <CardDescription className='font-semibold'> Total : <span className='font-bold text-teal-900'>{item.totalOrderPrice} EGP</span> </CardDescription>
                       </div>
                    </CardHeader>
                    <CardContent>
                        {item.shippingAddress && <div>
                          <p className='font-bold'>Shipping Address :</p>
                        <CardDescription><span className='font-bold'>City :</span> {item.shippingAddress?.city}</CardDescription>
                        <CardDescription><span className='font-bold'>Phone :</span> {item.shippingAddress?.phone}</CardDescription>
                        <CardDescription><span className='font-bold'>Details :</span> {item.shippingAddress?.details}</CardDescription>
                        </div>}
                    </CardContent>
                    <CardFooter>
                        <OrderItems products={item.cartItems} />
                    </CardFooter>
                    <p className='text-gray-500 font-semibold flex justify-end text-sm me-2'>Last Update : {formatDateTime(item.updatedAt) }</p>
                </Card>
          )}
                
        </div>)
            
        }
        </div>
    </>
  )
}
