import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image';
import { getProductsApi } from '@/components/getProductsActions/getProducts';
import { BrandI } from '@/interface';
import Link from 'next/link';

export default async function Brands() {
     const response = await getProductsApi('brands')
    const {data : brands} : {data : BrandI[]} = await response.json() 
  return (
    <>
    <div className="overflow-hidden w-full mt-10 mb-5">
        <h2 className='  text-3xl font-bold mb-8 flex p-5 items-center justify-center relative '>
            <span className='absolute z-1 peer'>All Brands</span> 
            <ShoppingBasket className='text-gray-400 peer-hover:text-teal-500 duration-200 absolute w-13 h-13' strokeWidth={2.5}/>
             </h2>
        <div className="flex gap-5 animate-scroll-brand  px-3">
    
    {brands.map((brand) => (
      <Link key={brand._id} href={`/brands/${brand._id}`}>
        <div className="min-w-[260px] cursor-pointer group hover:scale-[1.05] hover:rotate-1 duration-300">
          <Card className="rounded-xl overflow-hidden">
            <CardHeader>
              <Image
                src={brand.image}
                alt={brand.name}
                width={200}
                height={200}
                className="w-full h-[200px] object-cover"
              />
            </CardHeader>

            <CardContent>
              <CardTitle className="text-center font-bold text-xl group-hover:text-teal-600 duration-300 uppercase">
                {brand.name}
              </CardTitle>
            </CardContent>
          </Card>
        </div>
      </Link>
    ))}

  </div>
</div>
    </>
  )
}
