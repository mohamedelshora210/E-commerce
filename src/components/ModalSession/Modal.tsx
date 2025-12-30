
'use client'
import React, { useContext, useRef, useState } from 'react'
 import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { CartContext } from '../Context/Context'
import { Loader2 } from 'lucide-react'
import { getUserToken } from '@/app/Helpers/getUserToken'
import { getSessionPRoduct } from './_action/getSession.action'
import { cashOrders } from './_action/cashOrders.action'

 

export default function Modal({cartId} : {cartId : string}) {
 const {setCartData}= useContext(CartContext)
 const router = useRouter()
   const city =  useRef<HTMLInputElement | null>(null)
   const phone =  useRef<HTMLInputElement | null>(null)
   const details =  useRef<HTMLInputElement | null>(null)

  const [isLoadingVisa, setIsLoadingVisa] = useState(false)
  const [isLoadingCash, setIsLoadingCash] = useState(false)
  async function getSession(){

    setIsLoadingVisa(true)
    const shippingAddress = {
   city : city.current?.value || '',
   phone : phone.current?.value || '',
   details : details.current?.value || '',
  }

  const data = await getSessionPRoduct(shippingAddress, cartId)
  if(data.status == 'success'){
        window.location.href = data.session.url
       }
   setIsLoadingVisa(false)
   
}
async function cashOrder(){

  setIsLoadingCash(true)
  const shippingAddress = {
   city : city.current?.value || '',
   phone : phone.current?.value || '',
   details : details.current?.value || '',
  }
  
  const data = await cashOrders(cartId , shippingAddress)
  if(data.status == 'success'){
    setCartData(null)
    router.push('/allorders')
  }
  setIsLoadingCash(false)
  
}

   
  return (
    <>
        <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer">Proceed To Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Your Info.</DialogTitle>
            <DialogDescription>
              please enter valid information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">

            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" ref={city} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" ref={phone} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input id="details" name="details" ref={details} />
            </div>
           
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className='cursor-pointer' variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={()=>cashOrder()} className='cursor-pointer' type="submit">{isLoadingCash ? <Loader2 className='animate-spin'/> :'Cash'}</Button>
            <Button onClick={()=>getSession()} className='cursor-pointer' type="submit">{isLoadingVisa ? <Loader2 className='animate-spin'/> :'Visa'} </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
      
   
    </>
  )
}
