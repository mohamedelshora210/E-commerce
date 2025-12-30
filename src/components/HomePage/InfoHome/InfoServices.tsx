import { Users } from 'lucide-react'
import React from 'react'

export default function InfoServices() {
  return (
    <>
    <section className='bg-white py-10'>
        <div className='container mx-auto'>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mx-4'>
            <div className='flex flex-col bg-teal-50 items-center justify-center p-6 rounded-xl'>
                <Users className='text-yellow-500 w-14 h-14'/>
                <h2 className='text-3xl font-semibold font-serif text-teal-700 text-center my-4'>satisfied customers</h2>
                <h3 className='text-4xl font-bold font-mono text-[#45595b]'>1963</h3>
            </div>

            <div className='flex flex-col bg-teal-50 items-center justify-center p-6 rounded-xl'>
                <Users className='text-yellow-500 w-14 h-14'/>
                <h2 className='text-3xl font-semibold font-serif text-teal-700 text-center my-4'>quality of service</h2>
                <h3 className='text-4xl font-bold font-mono text-[#45595b]'>99%</h3>
            </div>

            <div className='flex flex-col bg-teal-50 items-center justify-center p-6 rounded-xl'>
                <Users className='text-yellow-500 w-14 h-14'/>
                <h2 className='text-3xl font-semibold font-serif text-teal-700 text-center my-4'>quality certificates</h2>
                <h3 className='text-4xl font-bold font-mono text-[#45595b]'>33</h3>
            </div>
            
            <div className='flex flex-col bg-teal-50 items-center justify-center p-6 rounded-xl'>
                <Users className='text-yellow-500 w-14 h-14'/>
                <h2 className='text-3xl font-semibold font-serif text-teal-700 text-center my-4'>Available Products</h2>
                <h3 className='text-4xl font-bold font-mono text-[#45595b]'>789</h3>
            </div>
        </div>
        </div>
        </section>
    </>
  )
}
