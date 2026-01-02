import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StoreIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import { getProductsApi } from '@/components/getProductsActions/getProducts';
import { CategoryI } from '@/interface';
import Link from 'next/link';
import CursalCategories from './CursalCategories/CursalCategories';




export default async function Categories() {
    const response = await getProductsApi('categories')
    const {data : categories} : {data : CategoryI[]} = await response.json() 
  return (
    <>
       <div className="overflow-hidden w-full mt-5 mb-10">
            <h2 className='  text-3xl font-bold mb-8 flex p-8 items-center justify-center relative '>
                <span className='absolute z-1 peer'>All Categories</span> 
                <StoreIcon className='text-gray-400 peer-hover:text-teal-500 duration-200 absolute w-13 h-13' strokeWidth={2.5}/>
             </h2>  
             
              <CursalCategories categories={categories}/>
      </div>
    </>
  )
}
