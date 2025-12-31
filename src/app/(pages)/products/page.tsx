import { getProductsApi } from '@/components/getProductsActions/getProducts'
import React from 'react'
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
import {  ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import { ProductI } from '@/interface';
import HeartIconComponent from '@/components/HeartIcon/HeartIcon';
import { Badge } from "@/components/ui/badge"


export default async function Products() {
const response = await getProductsApi('products')
const {data : products} : {data : ProductI[]} = await response.json()  
  return (
    <>
    <div className='container mx-auto'>
          <h2 className='text-2xl font-bold mt-2 flex gap-1 items-center mx-3'><span>All Products</span> <ShoppingBasket className='text-teal-600'/> </h2>

      <div className='mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>

     { products.map((product)=> <div key={product._id}> <Card className='-mb-1 relative overflow-hidden'>
      {product.ratingsAverage >= 4.5 && <Badge className='ml-2 px-10 py-2  rounded-none bg-yellow-600 absolute z-3 end-0 top-6 -translate-y-2 translate-x-8 rotate-45'>Popular</Badge>
}
  <CardHeader className='group  overflow-hidden relative'>
    <Image className='group-hover:scale-[1.3] group-hover:rotate-3 duration-450 w-[85%] mx-auto ' src={product.imageCover} alt={product.title} width={180} height={180}/>

  <Button className='bg-transparent text-black border border-black rounded-full hover:bg-gray-900 hover:text-white w-1/2  absolute left-[25%] -bottom-18 group-hover:bottom-3 duration-550 cursor-pointer'>
  <Link href={`/products/${product._id}`}>View Product</Link>
  </Button>
  </CardHeader>
  <CardContent>
    <CardDescription >{product.category.name} - {product.brand.name}</CardDescription>
    <div className='flex items-center justify-between'>
        <Link href={`/products/${product._id}`}><CardTitle className='my-3 font-bold text-teal-800 hover:text-teal-700 duration-200 '>{product.title.split(' ' , 2).join(' ')}</CardTitle></Link>
        <HeartIconComponent productId={product._id}/>
    </div>
        <div className='flex gap-1 my-2'>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <span>({product.ratingsAverage})</span>
        </div>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>{product.price.toLocaleString()} EGP</h2>
              <Tooltip>
            <TooltipTrigger>
              <ShoppingCart productId={product._id}/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add To Cart</p>
            </TooltipContent>
          </Tooltip>
    
          
        </div>
  </CardContent>
</Card></div>)}

      </div>
      </div>
    </>
  )
}
