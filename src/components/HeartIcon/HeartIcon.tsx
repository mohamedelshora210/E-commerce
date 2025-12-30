'use client'
import { HeartIcon, Loader2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { WishListContext } from '../Context/WishListContext'
import { getUserToken } from '@/app/Helpers/getUserToken'
import { postWishListProduct } from './_action/postWishList.action'
import { deleteWishList } from './_action/deleteWishList.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function HeartIconComponent({productId } : {productId : string}) {
const {wishListData , getWishList } = useContext(WishListContext)
const [isLoading, setIsLoading] = useState(false)
const session = useSession()
const router = useRouter()

  async function postWishList(){
    if(session.status == 'authenticated')
      {
        setIsLoading(true)
    const data = await postWishListProduct(productId)
    if(data.status == 'success')
        {
          getWishList()
          toast.success(data.message)
        }
    setIsLoading(false) 
      } 
      else 
      {
        router.push('/signin')
      }
  }

  async function removeWishList(){
    setIsLoading(true)
        const data = await deleteWishList(productId)
        if(data.status == 'success'){
      toast.success(data.message)
      getWishList()
    }
    setIsLoading(false)
  }


  const isInWishlist = wishListData?.data?.some((item) => item._id === productId)
  
  return (
    <>
      {isLoading ? <Loader2 className='animate-spin text-teal-700'/> : <HeartIcon 
      onClick={()=>{
          if(isInWishlist)
          {
            removeWishList()
          }
          else 
          {
            postWishList()
          }
      }} className={`cursor-pointer  duration-300 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'} `} strokeWidth={isInWishlist ? 3 : 2}/>
}        
    </>
  )
}
