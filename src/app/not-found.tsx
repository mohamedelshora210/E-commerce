import React from 'react'

import img from '../../public/images/notFound.png'
import Image from 'next/image'
import Link from 'next/link'
export default function NotFound() {
  return (
    <>
         <section className='min-h-[85dvh] overflow-hidden'>
            <div className="container mx-auto">
            <div className="flex flex-col items-center justify-start mt-8 min-h-[60vh] pt-5 bg-teal-50 text-teal-800 px-4 text-center">
      
      <h1 className="text-4xl sm:text-6xl font-bold mb-1 xl:-translate-x-75">Ooops!</h1>

      <div className="relative w-full max-w-md ">
        
            <span className="absolute -top-3 left-6 sm:-top-6 sm:left-0 md:-top-10 md:-left-4 text-gray-300 font-semibold select-none z-0
            md:text-[15rem] text-[14rem]">
            404
            </span>

        
            <div className="absolute z-10 top-5 -left-10 mt-5">
            <Image
                src={img}
                alt="فتاة جالسة على 404"
                width={600}
                height={600}
                className="w-full  sm:max-w-md md:max-w-md object-contain"
            />
            </div>
      </div>

    </div>
      <h3 className='text-center mt-0 text-3xl sm:text-4xl font-semibold text-teal-800 xl:translate-x-75 '>There are no stylish clothes here</h3>
         </div>
         </section>
    </>
  )
}
