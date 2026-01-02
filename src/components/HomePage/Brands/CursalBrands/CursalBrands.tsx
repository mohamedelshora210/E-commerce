"use client";
import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import Link from "next/link";
import Image from "next/image";
import { BrandI } from '@/interface';
export default function CursalBrands({brands} : { brands: BrandI[] }) {
  return (
    <>
          <Swiper
          dir='rtl'
      modules={[Autoplay, FreeMode]}
      slidesPerView="auto"
      spaceBetween={20}
      freeMode={
            {
                enabled: true,
            momentum: false,
         }
      }
      loopAdditionalSlides={brands.length}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      speed={2000} 
      className="px-3"
    >
      {brands.map((brand) => (
        <SwiperSlide key={brand._id} className="!w-[260px]">
          <Link href={`/categories/${brand._id}`}>
            <div className="cursor-pointer group hover:scale-[1.05] hover:rotate-1 duration-300">
              <div className="rounded-xl overflow-hidden border">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={260}
                  height={200}
                  className="w-full h-[200px] object-cover"
                />
                <h3 className="text-center font-bold text-xl py-4 group-hover:text-teal-600 duration-300 uppercase">
                  {brand.name}
                </h3>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  )
}
