import React from 'react'
import { ProductI } from './../../../../interface/products';
import { Params } from 'next/dist/server/request/params';
import { getSpecific } from '@/components/getProductsActions/getProducts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import StarIcon from '@/components/starIcon/StarIcon';
import { HeartIcon ,Ribbon } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import HeartIconComponent from '@/components/HeartIcon/HeartIcon';
import { Badge } from '@/components/ui/badge';


export default async function page({params} : {params : Params}) {
 
    const {brandId} = await params
    const specificBrand = await getSpecific('brands' , brandId)
    const response = await fetch(`${process.env.NEXT_BASE_URL}products?brand=${brandId}`)
    const {data:brands} :{data :ProductI[]} = await response.json()
  return (
    <>
    <div className='container mx-auto'>
    <div>
        <h2 className='text-2xl font-bold mt-2 flex gap-1 items-center mx-3 sm:mx-0'><span>{specificBrand.name}</span><Ribbon className='text-teal-700'/></h2>
        <p className='text-muted-foreground font-semibold mx-3 sm:mx-0'>Products from this brand</p>
      </div>

    {brands.length == 0 ? <div className='text-muted-foreground font-semibold flex items-center justify-center min-h-75'><p>No products found from this brand.</p></div> :
      <div className='mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5'>
      {brands.map((brand)=> <div key={brand.id}> <Card className='-mb-1 relative overflow-hidden'>
        {brand.ratingsAverage >= 4.5 && <Badge className='ml-2 px-10 py-2  rounded-none bg-yellow-600 absolute z-3 end-0 top-6 -translate-y-2 translate-x-8 rotate-45'>Popular</Badge>}
  <CardHeader className='group  overflow-hidden relative'>
    <Image className='group-hover:scale-[1.3] group-hover:rotate-3 duration-450 w-[85%] mx-auto ' src={brand.imageCover} alt={brand.title} width={180} height={180}/>

  <Button className='bg-transparent text-black border border-black rounded-full hover:bg-gray-900 hover:text-white w-1/2  absolute left-[25%] -bottom-18 group-hover:bottom-3 duration-550 cursor-pointer'>
  <Link href={`/products/${brand._id}`}>View Product</Link>
  </Button>
  </CardHeader>
  <CardContent>
    <CardDescription >{brand.category.name} - {brand.brand.name}</CardDescription>
    <div className='flex items-center justify-between'>
        <Link href={`/products/${brand._id}`}><CardTitle className='my-3 font-bold text-teal-800 hover:text-teal-700 duration-200'>{brand.title.split(' ' , 2  ).join(' ')}</CardTitle></Link>
        <HeartIconComponent productId={brand._id}/>
    </div>
        
          <div className='flex gap-1 my-2'>
            <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <span>({brand.ratingsAverage})</span>
          
        </div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>{brand.price} EGP</h2>

    <Tooltip>
  <TooltipTrigger>
    <ShoppingCart productId={brand._id}/>
  </TooltipTrigger>
  <TooltipContent>
    <p>Add To Cart</p>
  </TooltipContent>
</Tooltip>
          
        </div>
  </CardContent>
</Card></div>)}
    </div>}
    </div>
    </>
  )
}
