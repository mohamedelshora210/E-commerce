'use client'
import React, { useRef, useState } from 'react'
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
import { Loader2, Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { addAddress } from './addAddress.action'
import { DataAddressI } from '@/interface'
import toast from 'react-hot-toast'


export default function AddAddress({setAddressData} : {setAddressData : React.Dispatch<React.SetStateAction<DataAddressI | null>>} ) {
    const name = useRef<HTMLInputElement | null>(null)
    const city = useRef<HTMLInputElement | null>(null)
    const details = useRef<HTMLInputElement | null>(null)
    const phone = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    

    async function addAddresses(){
        setIsLoading(true)

        const dataAddress = {
        name : name.current?.value || '',
        city : city.current?.value || '',
        details : details.current?.value || '',
        phone : phone.current?.value || ''
    }
        const data = await addAddress(dataAddress)
        if(data.status == 'success')
        {
            toast.success(data.message!)
            setAddressData(data)
        }

        setIsLoading(false)
        setOpen(false)
    }
  return (
    <>
         <Dialog open={open} onOpenChange={setOpen}>
      <form>
            <Tooltip>
      <TooltipTrigger asChild>
        <DialogTrigger asChild>
        {isLoading ?<Loader2 className='text-teal-800 w-5 h-5 animate-spin' strokeWidth={3}/> : <Plus className='text-teal-800 w-5 h-5 cursor-pointer hover:scale-115 duration-150' strokeWidth={3}/>}
        </DialogTrigger>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add your address</p>
      </TooltipContent>
    </Tooltip>
          
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add your address</DialogTitle>
            <DialogDescription>
              Add your address to make it easier for the product to reach you.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">

            <div className="grid gap-3">
              <Label htmlFor="city-1">City</Label>
              <Input id="city-1" name="city" placeholder="Your city" ref={city}/>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="Your street name" ref={name}/>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone-1">Phone</Label>
              <Input id="phone-1" name="phone" placeholder="Your phone number" ref={phone}/>
            </div>

             <div className="grid gap-3">
              <Label htmlFor="details-1">Details</Label>
              <Input id="details-1" name="datails" placeholder="details..." ref={details} />
            </div>
           
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className='cursor-pointer '>Cancel</Button>
            </DialogClose>
            <Button className='bg-teal-700 hover:bg-teal-800 cursor-pointer' onClick={()=>{addAddresses()}}>Save changes {isLoading && <Loader2 className=' animate-spin'/>}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </>
  )
}
