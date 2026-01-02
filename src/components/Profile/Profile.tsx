'use client'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {  Plus, User2, User2Icon } from 'lucide-react'
import UpdatePassword from './UpdatePassword/UpdatePassword'
import UpdateData from './UpdateData/UpdateData'
import Address from './Address/Address'


export default function Profile({name} : {name :string}) {

    const [image, setImage] = useState<string | null>(null);

  function ChooseImage(e : React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]
    if(file)
    {
      const img = URL.createObjectURL(file)
      setImage(img)
    }
  }
  return (
    <>
         <Sheet>
  <SheetTrigger asChild>
    <p className='pl-2 rounded cursor-pointer hover:bg-gray-100'>Profile</p>
    </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className='text-xl font-bold text-teal-800 flex gap-2 items-center mb-1'>Your Profile <User2/></SheetTitle>
       <hr className='w-3/7  rounded-2xl border-teal-600'/>

       <div className='flex items-center justify-evenly mt-2 '> 
        <label>
          {image ? <img src={image} alt="avatar" className="w-16 h-16 rounded-full object-cover cursor-pointer border-2 border-teal-600"
          /> : 
          <div className='relative '>
          <User2Icon className='w-13 h-13 p-2 border-3 rounded-full cursor-pointer text-gray-400 hover:border-teal-600 hover:text-teal-600 duration-200'/>
           <Plus className='absolute top-1/2 left-1/2 -translate-1/2 w-5 h-5 text-teal-800' strokeWidth={2.5}/>
          </div>
}
          <input type='file' className='hidden' onChange={(e)=>{ChooseImage(e)}}/>
        </label>
        <h2 className='text-xl font-bold text-teal-800'>{name ? name : 'User'}</h2>
       </div>
        <UpdatePassword/>
        <UpdateData/>
        <Address/>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </>
  )
}
