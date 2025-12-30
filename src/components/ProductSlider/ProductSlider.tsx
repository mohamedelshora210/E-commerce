'use client'

import React, {  useState } from 'react'
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

export default function ProductSlider({images , altContent}:{images:string[] , altContent:string}) {
     const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
    <div className='flex md:flex-col  justify-between mb-3 md:mb-0 md:w-50'>
      {images.map((img , index)=><Image
        key={index}
        src={img}
        alt={altContent}
        width={60}
        height={60}
        className={`cursor-pointer border rounded mb-2 ${
          selectedIndex === index ? 'border-teal-600' : 'border-gray-300'
        }`}
        onClick={() => setSelectedIndex(index)}
      />)}
              </div>
            <Carousel 

            
            opts={{
                    loop: true,
                }}
                plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} >
          <CarouselContent>
            {images.map((img , index)=><CarouselItem key={index}><Image  src={img} alt={altContent} width={220} height={220} className='mx-auto'/></CarouselItem>
)}
          </CarouselContent>

        </Carousel>
    </>
  )
}
