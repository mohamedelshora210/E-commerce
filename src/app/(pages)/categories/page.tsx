import { getProductsApi } from '@/components/getProductsActions/getProducts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryI } from '@/interface'
import {  StoreIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {
   const response = await getProductsApi('categories')
      const {data : categories} : {data : CategoryI[]} = await response.json() 
    console.log(categories);

  return (
    <>
    <div className='container mx-auto'>
     <h2 className=' mx-3 text-2xl font-bold mt-2 flex gap-1 items-center'><span>All Categories</span> <StoreIcon className='text-teal-600'/> </h2>
    <div className='mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5'>
      
      {categories.map((category)=><Link key={category._id} href={`/categories/${category._id}`} ><div  className='cursor-pointer group hover:scale-[1.04] hover:rotate-1 hover:-translate-y-1  duration-300'>
        <Card>
          
        <CardHeader>
          <Image className='h-75' src={category.image} alt={category.name} width={250} height={250}/>
        </CardHeader>
        <CardContent>
           <CardTitle className='text-center font-bold text-xl group-hover:text-teal-600 duration-300 uppercase'>{category.name}</CardTitle>
        </CardContent>
      </Card>
      </div> </Link>)}
      </div>
      </div>
    </>
  )
}
