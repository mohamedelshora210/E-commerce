
'use client'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { CartItem } from '@/interface'
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function OrderItems({products } : {products : CartItem[] }) {
  return (
    <>
    <Sheet>
  <SheetTrigger asChild>
    <Button className='capitalize bg-teal-700 cursor-pointer hover:bg-teal-600'>view order items</Button>
    </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className='text-xl font-bold text-teal-800 flex gap-2 items-center'>Your Products <ShoppingBasket/></SheetTitle>
      
   <div className='space-y-4'>
     {products.map((item)=><Link key={item._id} href={`/products/${item.product._id}`}>
            <div className='shadow rounded-2xl p-2 flex items-center gap-4 hover:bg-gray-200 mb-3 duration-150'>
            <Image src={item.product.imageCover} className='rounded-full w-18 h-18' alt='' width={200} height={200}/>
            <div className=' grow'>
                <h2 className='font-bold text-teal-800'>{item.product.title}</h2>
                <div className='flex items-center justify-between mt-1'>
                <h2 className='font-semibold '>Price : <span className='font-bold text-green-700'>{item.price} EGP</span></h2>
                <p className='font-semibold '>Count : <span className='font-bold text-yellow-600'>{item.count}</span></p>
                </div>
            </div>
           </div>
    </Link>)}
   </div>

      
    </SheetHeader>
  </SheetContent>
</Sheet>
    </>
  )
}
