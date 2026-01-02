import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image';
import { getProductsApi } from '@/components/getProductsActions/getProducts';
import { BrandI } from '@/interface';
import Link from 'next/link';
import CursalBrands from './CursalBrands/CursalBrands';

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
             <CursalBrands brands={brands}/>

    </div>
    
    </>
  )
}
