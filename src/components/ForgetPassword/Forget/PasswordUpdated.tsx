import { Button } from '@/components/ui/button'
import {  CircleCheckBig } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PasswordUpdated() {
  return (
    <>
        <div className="flex flex-col items-center justify-center w-full ">
            <CircleCheckBig className='text-green-500 rounded-full bg-green-100 p-3 w-18 h-18' strokeWidth={2}/>
            <h2 className='text-3xl font-bold my-5'>Password Updated</h2>
            <p className='font-semibold mt-5 mb-6 text-green-700 text-lg flex flex-col items-center bg-green-100 py-3 px-7'>
                <span>Your password has been successfully reset.</span>
                <span> Your account is now secure.</span>
            </p>
            <Button className='px-6 py-3 bg-teal-800 hover:bg-teal-700 hover:scale-105 duration-200'><Link href={'/signin'}>Sign in with new password</Link></Button>
        </div>
    </>
  )
}
