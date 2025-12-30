'use client'
import { ShoppingBagIcon,  Loader2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { CardFooter } from '../ui/card'
import { AddToCart } from '../AddToCart/AddToCart'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/Context'
import HeartIconComponent from '../HeartIcon/HeartIcon'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CardFooterAddToCart({productId} :{productId : string}) {
    const [isUpdating, setIsUpdating] = useState(false)
   const {setCartData , setIsLoading} = useContext(CartContext)

   const session = useSession()
   const router = useRouter()

  async function addToCart(){
    
          if(session.status=='authenticated')
          {
            setIsUpdating(true)
  setIsLoading(true)
   const data =await AddToCart(productId)
   data.status=='success' && toast.success(data.message)
   console.log(data);
    setCartData(data)
     setIsUpdating(false)
    setIsLoading(false)
  }
  else 
    {
      router.push('/signin')
    }
   
  }
  return (
    <>
        <CardFooter className='gap-2 mt-4'>
    
      <Button onClick={()=>addToCart()} className={isUpdating ? 'grow text-teal-500 scale-[1.01] duration-500' : 'grow cursor-pointer'}>Add To Cart {isUpdating ? <Loader2 className='animate-spin text-teal-500'/> : <ShoppingBagIcon/>}</Button>
      <HeartIconComponent productId={productId}/>
    
  </CardFooter>
    </>
  )
}
