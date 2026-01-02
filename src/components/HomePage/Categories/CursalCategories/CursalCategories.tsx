"use client";
import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import Link from "next/link";
import Image from "next/image";
import { CategoryI } from '@/interface';

export default function CursalCategories({categories} : {categories :  CategoryI[]}) {
  return (
    <>
         <Swiper
      modules={[Autoplay, FreeMode]}
      slidesPerView="auto"
      spaceBetween={20}
      freeMode={
            {
                enabled: true,
            momentum: false,
         }
      }
      loopAdditionalSlides={categories.length}
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
      {categories.map((category) => (
        <SwiperSlide key={category._id} className="!w-[260px]">
          <Link href={`/categories/${category._id}`}>
            <div className="cursor-pointer group hover:scale-[1.05] hover:rotate-1 duration-300">
              <div className="rounded-xl overflow-hidden border">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={260}
                  height={200}
                  className="w-full h-[200px] object-cover "
                />
                <h3 className="text-center font-bold text-xl py-4 group-hover:text-teal-600 duration-300 uppercase">
                  {category.name}
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
