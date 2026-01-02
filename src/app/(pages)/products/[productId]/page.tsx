import React from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductI } from '@/interface';
import { Params } from 'next/dist/server/request/params';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import StarIcon from '@/components/starIcon/StarIcon';

import CardFooterAddToCart from '@/components/CardFooterAddToCart/CardFooterAddToCart';

export const metadata = {
  title: "ProductDetails",
};

export default async function ProductDetails({params} : {params :Params}) {
let {productId} =await params

  const response = await fetch(`${process.env.NEXT_BASE_URL}products/${productId}`)
  const {data : product}:{data : ProductI} = await response.json();

  
  
  return (
    <>
    <div className='container mx-auto'>
     <div className='flex items-center justify-center mx-auto w-4/6 min-h-100 my-5 '>
       <Card className='w-full grid md:grid-cols-6 grid-cols-1 px-2'>
        <div className='col-span-3'>
        <ProductSlider images={product.images} altContent={product.title} />
        </div>

  <div className='col-span-3 '>
      <CardHeader >
        <div className='flex items-center justify-between'> 
        <CardDescription className='text-md font-semibold'>
          {product.brand.name}
        </CardDescription>
         <h2 className='text-md font-semibold'> Quantity : <span className='font-bold text-teal-800'>{product.quantity}</span> </h2>
        </div>
    <CardTitle className='text-xl font-bold '>
        {product.title}
    </CardTitle>

  </CardHeader>
    <CardContent >
    <p className='my-4'>{product.description}</p>
    <CardDescription>
          {product.category.name}
        </CardDescription>
        
       <div className='flex'>
         <StarIcon/>
        <StarIcon/>
        <StarIcon/>
        <StarIcon/>
        <StarIcon/>
        <span>({product.ratingsAverage})</span>
       
        </div>
       <CardDescription className='my-2 text-2xl font-bold text-black'>
          {product.price.toLocaleString()} EGP
        </CardDescription>
  </CardContent>
<CardFooterAddToCart productId={product._id}/>
  </div>
</Card>
     </div>
     </div>
    </>
  )
}
