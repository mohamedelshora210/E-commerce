'use client'

import React, { useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from "swiper";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface ProductSliderProps {
  images: string[];
  altContent: string;
}


export default function ProductSlider({images , altContent}:ProductSliderProps) {
     const [selectedIndex, setSelectedIndex] = useState(0)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);


  return (
    <>

<div className='flex flex-col lg:flex-row overflow-hidden '>
   <Swiper
        onSwiper={(swiper) => setMainSwiper(swiper)}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper ?? undefined }} 
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 h-75 w-full "
        autoplay={{
          delay: 0, 
          disableOnInteraction: false,
        }}
        speed={2000}  
        loop={true}
        
        onMouseEnter={() => mainSwiper?.autoplay?.stop()} 
        onMouseLeave={() => mainSwiper?.autoplay?.start()}
        
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={altContent}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        slidesPerView={4}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true} 
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-78 md:w-55 md:h-16 xl:w-13 lg:w-15 my-2 h-24 lg:h-[290px] xl:h-[300px] " 
         breakpoints={{
    0: { direction: 'horizontal', slidesPerView: 4 }, 
    768: { direction: 'horizontal', slidesPerView: 4 }, 
    1024: { direction: 'vertical', slidesPerView: 4 }, 
  }}
        
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} >
            <Image
              src={img}
              alt={altContent}
              width={100}
              height={100}
              className="cursor-pointer object-cover rounded border"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </>
  )
}
