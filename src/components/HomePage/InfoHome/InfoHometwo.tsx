import { CreditCard, LockIcon, LockOpenIcon, Rss, Settings } from 'lucide-react'
import React from 'react'

export default function InfoHomeTwo() {
  return (
    <>
    <section className='bg-white py-10'>
    <div className='container mx-auto'>
    <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mb-10 mt-4 mx-4'>
        <div className='flex items-center gap-5 bg-teal-50 px-5 py-10 group hover:shadow-teal-800 shadow rounded-2xl duration-200 hover:-translate-y-2'>
            <LockIcon className='text-teal-800 w-8 h-8 group-hover:hidden duration-400' strokeWidth={3.5}/>
            <LockOpenIcon className='text-teal-800 w-8 h-8 group-hover:block duration-400 hidden' strokeWidth={3.5}/>
            <div className='text-center'>
                <h2 className='text-xl font-bold'>Secure Payment</h2>
                <p className='font-semibold text-muted-foreground'>We Value Your Security</p>
            </div>
        </div>
        
        <div className='flex items-center gap-3 bg-teal-50 px-5 py-10 group hover:shadow-teal-800 shadow rounded-2xl duration-200 hover:-translate-y-2'>
            <Rss className='text-teal-800 w-8 h-8  group-hover:scale-115 duration-400' strokeWidth={3.5}/>
            <div className='text-center'>
                <h2 className='text-xl font-bold'>Online Service</h2>
                <p className='font-semibold text-muted-foreground'>Free return products in 30 days</p>
            </div>
        </div>

        <div className='flex items-center gap-3 bg-teal-50 px-5 py-10 group hover:shadow-teal-800 shadow rounded-2xl duration-200 hover:-translate-y-2'>
            <Settings className='text-teal-800 w-8 h-8 group-hover:rotate-360 duration-400' strokeWidth={3.5}/>
            <div className='text-center'>
                <h2 className='text-xl font-bold'>Special packaging</h2>
                <p className='font-semibold text-muted-foreground'>We support online 24 hrs a day</p>
            </div>
        </div>

        <div className='flex items-center gap-3 bg-teal-50 px-5 py-10 group hover:shadow-teal-800 shadow rounded-2xl duration-200 hover:-translate-y-2'>
            <CreditCard className='text-teal-800 w-8 h-8 group-hover:scale-115 duration-400' strokeWidth={3.5}/>
            <div className='text-center'>
                <h2 className='text-xl font-bold'>Receive Gift Card</h2>
                <p className='font-semibold text-muted-foreground'>Recieve gift all over oder $50</p>
            </div>
        </div>

    </div>
    </div>
     </section>
    
    </>
  )
}
