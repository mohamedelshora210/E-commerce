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
import { User, User2 } from 'lucide-react'
import UpdatePassword from './UpdatePassword/UpdatePassword'
import UpdateData from './UpdateData/UpdateData'
import Address from './Address/Address'


export default function Profile() {
  return (
    <>
         <Sheet>
  <SheetTrigger asChild>
    <p className='pl-2 rounded cursor-pointer hover:bg-gray-100'>Profile</p>
    </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className='text-xl font-bold text-teal-800 flex gap-2 items-center'>Your Profile <User2/></SheetTitle>
        <UpdatePassword/>
        <UpdateData/>
        <Address/>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </>
  )
}
