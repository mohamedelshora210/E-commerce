import { CreditCard, RefreshCcw, Send, Settings } from 'lucide-react'
import React from 'react'

export default function InfoHome() {
  return (
    <>
    <section className='bg-white py-10'>
    <div className='container mx-auto'>
    <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mb-10 mt-4 mx-4 md:mx-0'>
        <div className='flex items-center gap-5 bg-teal-50 px-5 py-10 group hover:shadow-teal-800 shadow rounded-2xl duration-200 hover:-translate-y-2'>
            <RefreshCcw className='text-teal-800 w-8 h-8 group-hover:rotate-180 duration-400' strokeWidth={3.5}/>
            <div className='text-center'>
                <h2 className='text-xl font-bold'>Free Return</h2>
                <p className='font-semibold text-muted-foreground'>30 days money back guarantee!</p>
            </div>
        </div>
        
        <div className='flex items-center gap-3 bg-teal-50 px-5 py-10 group hover:shadow-teal-800 shadow rounded-2xl duration-200 hover:-translate-y-2'>
            <Send className='text-teal-800 w-8 h-8 group-hover:translate-x-5 group-hover:-translate-y-5 duration-400' strokeWidth={3.5}/>
            <div className='text-center'>
                <h2 className='text-xl font-bold'>Free Shipping</h2>
                <p className='font-semibold text-muted-foreground'>Free shipping on all order</p>
            </div>
        </div>

        <div className='flex items-center gap-3 bg-teal-50 px-5 py-10 group hover:shadow-teal-800 shadow rounded-2xl duration-200 hover:-translate-y-2'>
            <Settings className='text-teal-800 w-8 h-8 group-hover:rotate-360 duration-400' strokeWidth={3.5}/>
            <div className='text-center'>
                <h2 className='text-xl font-bold'>Support 24/7</h2>
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
