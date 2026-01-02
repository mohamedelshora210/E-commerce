'use client'
import { WishListContext } from '@/components/Context/WishListContext'
import HeartIconComponent from '@/components/HeartIcon/HeartIcon';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import StarIcon from '@/components/starIcon/StarIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Heart, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, } from 'react'



export default function WishList() {
   const {wishListData } = useContext(WishListContext)

   
  return (
    <>

    <div className='container mx-auto'>
     <h2 className=' mx-3 text-2xl font-bold mt-2 mb-4 flex gap-1 items-center'><span>WishList</span> <Heart className='text-red-600 ' strokeWidth={3}/> </h2>

         {!wishListData?.data ? <div className='text-muted-foreground font-semibold flex items-center justify-center min-h-75'><Loader2 className='animate-spin text-teal-600 w-13 h-13' strokeWidth={3}/></div> :  wishListData?.data.length == 0 ? <div className='text-muted-foreground font-semibold flex items-center justify-center min-h-75'><p>No products found in whishList.</p></div> :
              <div className='mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5'>
              {wishListData?.data.map((item)=> <div key={item.id}> <Card className='-mb-1'>
          <CardHeader className='group  overflow-hidden relative'>
            <Image className='group-hover:scale-[1.3] group-hover:rotate-3 duration-450 w-[85%] mx-auto ' src={item.imageCover} alt={item.title} width={180} height={180}/>
        
          <Button className='bg-transparent text-black border border-black rounded-full hover:bg-gray-900 hover:text-white w-1/2  absolute left-[25%] -bottom-18 group-hover:bottom-3 duration-550 cursor-pointer'>
          <Link href={`/products/${item._id}`}>View Product</Link>
          </Button>
          </CardHeader>
          <CardContent>
            <CardDescription >{item.category.name} - {item.brand.name}</CardDescription>
            <div className='flex items-center justify-between'>
                <CardTitle className='my-3'>{item.title.split(' ' , 2  ).join(' ')}</CardTitle>
                <HeartIconComponent productId = {item.id}/>
            </div>
                
                  <div className='flex gap-1 my-2'>
                    <StarIcon/>
                  <StarIcon/>
                  <StarIcon/>
                  <StarIcon/>
                  <span>({item.ratingsAverage})</span>
                  
                </div>
                <div className='flex items-center justify-between'>
                  <h2 className='text-xl font-bold'>{item.price} EGP</h2>
        
            <Tooltip>
          <TooltipTrigger>
            <ShoppingCart productId={item._id}/>
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
