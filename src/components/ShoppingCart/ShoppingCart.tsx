'use client'
import { Loader2, ShoppingBag } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AddToCart } from '../AddToCart/AddToCart';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/Context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ShoppingCart({productId} : {productId : String}) {
    const [isUpdating, setIsUpdating] = useState(false)
      const {setCartData , setIsLoading} = useContext(CartContext)

      const session = useSession()
      const router = useRouter()
     async function AddProduct(){
        
          if(session.status=='authenticated')
          {
            setIsLoading(true)
        setIsUpdating(true)
            const data =await AddToCart(productId)
   data.status=='success' && toast.success(data.message)
   console.log(data);
   setCartData(data)
   setIsLoading(false)
        setIsUpdating(false)
          }
          else 
          {
            router.push('/signin')
          }
        
 }
  return (
    <>
        {isUpdating ? <Loader2 className='animate-spin text-teal-700'/> :<ShoppingBag onClick={()=>AddProduct()} className='hover:text-teal-800 duration-300 cursor-pointer'/>
}
    </>
  )
}
