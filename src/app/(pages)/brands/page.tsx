import { getProductsApi } from '@/components/getProductsActions/getProducts'
import { ShoppingBasket } from 'lucide-react';
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { BrandI } from '@/interface';
import  Link  from 'next/link';


export default async function Brands() {

    const response = await getProductsApi('brands')
    const {data : brands} : {data : BrandI[]} = await response.json() 
  
  
  return (
    <>
    <div className='container mx-auto'>
      <h2 className=' mx-3 text-2xl font-bold mt-2 flex gap-1 items-center'><span>All Brands</span> <ShoppingBasket className='text-teal-600'/> </h2>
      <div className='mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
      
      {brands.map((brand)=><Link key={brand._id} href={`/brands/${brand._id}`} ><div  className='cursor-pointer group hover:scale-[1.04] hover:rotate-1 hover:-translate-y-1  duration-300'><Card>
        <CardHeader>
          <Image src={brand.image} alt={brand.name} width={250} height={250}/>
        </CardHeader>
        <CardContent>
           <CardTitle className='text-center font-bold text-xl group-hover:text-teal-600 duration-300 uppercase'>{brand.name}</CardTitle>
        </CardContent>
      </Card>
      </div> </Link>)}
      </div>
      </div>
    </>
  )
}
