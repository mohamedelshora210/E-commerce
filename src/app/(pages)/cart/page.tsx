'use client'
import { CartContext } from '@/components/Context/Context';
import Modal from '@/components/ModalSession/Modal';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { updateProduct } from './_actions/updateProduct.action';
import { clearProduct } from './_actions/clearProduct.action';
import { removeProduct } from './_actions/deleteProduct.action';


export default  function Cart() {
  const {cartData  , getCart , setCartData} = useContext(CartContext)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [isClearing, setIsClearing] = useState<boolean>(false)

  async function updateProducts(productId:string , count:number){
  setUpdatingId(productId)
    const data = await updateProduct(productId , count)
    if(data?.status=='success')
  {
    toast.success('update your product')
    setCartData(data)
  }
  setUpdatingId(null)
  }
  
  async function clearProducts(){
  setIsClearing(true)
    const data = await clearProduct()
     if(data?.message=='success')
  {
    toast.success(' Your Cart Has been Empty')
    setCartData(null)
  }
  setIsClearing(false)
  }
  
  async function deleteProducts(productId:string ){
  setRemovingId(productId)
    const data = await removeProduct(productId)
    if(data?.status=='success')
  {
    toast.success(' product deleted')
    setCartData(data)
  }
  setRemovingId(null)
  }


 useEffect(()=>{
   if(typeof cartData?.data.products[0]?.product == 'string' || cartData == null){
      getCart()
  }
 },[cartData , getCart])


  return (
    <>
    <div className='container mx-auto'>
    <div className='my-5'>
      <h2 className='text-3xl font-bold flex gap-2 items-center'><span>Shopping Cart</span> <ShoppingCart className='text-teal-800' strokeWidth={3}/></h2>
      <p className='text-muted-foreground font-semibold'><span className='text-teal-700 font-bold'>{cartData?.numOfCartItems}</span> items in your cart</p>
    </div>

  {typeof cartData?.data.products[0]?.product == 'string' ? <div className='min-h-75 flex items-center justify-center'><Loader2 className='animate-spin text-teal-700 w-15 h-15'/></div> 
  : cartData?.numOfCartItems! > 0 ? <div className="grid grid-cols-1 lg:grid-cols-3  gap-5">

  <div className="col-span-2 space-y-4 ">
    {cartData?.data.products.map((item)=><div key={item._id} className="bg-white rounded-2xl">
    <div className=" flex gap-3 p-5 rounded-2xl shadow mb-6">
      <div>
        <Image src={item.product.imageCover} alt={item.product.title} width={100} height={100}/>
      </div>

      <div className="  w-full p-3 rounded">

        <div className="flex justify-between items-center">

            <div >
             <h3 className='text-xl font-semibold'>{item.product.title}</h3>
             <p className='text-gray-500 text-sm my-2'>{item.product.brand.name} - {item.product.category.name} </p>
           </div>

           <div >
             <h3 className='font-bold text-md'>{item.price.toLocaleString()} EGP</h3>
             <p className='text-muted-foreground text-xs text-end'>each</p>
           </div>
        </div>
        

        <div className="flex justify-between items-center mt-2">
          <div className='flex items-center'>
            <button onClick={()=>updateProducts(item.product._id , item.count -1)} disabled={item.count == 1} className='size-8 rounded-lg border hover:bg-accent cursor-pointer'>
              -
            </button>
            <span className='w-6 text-center font-medium mx-3'>
              {updatingId == item.product._id ? <Loader2 className='animate-spin text-teal-700 '/>  : item.count}
            </span>
            <button onClick={()=>updateProducts(item.product._id , item.count +1)}   className='size-8 rounded-lg border hover:bg-accent cursor-pointer'>
              +
            </button>
          </div>
          <button onClick={()=>deleteProducts(item.product._id)} className='cursor-pointer flex items-center gap-1 text-sm hover:font-semibold duration-100 text-destructive hover:underline'>
             {removingId == item.product.id ? <Loader2 className='animate-spin '/> : <span>Remove</span>} 
          </button>
        </div>

      </div>
    </div>
  </div>)}
  </div>
  


  <div className=" col-span-1 sticky top-20  h-fit">
    <div className='rounded-2xl shadow  p-5 mb-4 bg-white '>
      <h2 className='text-xl font-semibold'>Order Summary</h2>
    <div className="flex items-center justify-between border-b border-gray-200 ">
      <div className='text-muted-foreground my-4'>
        <p className='my-2'>Subtotal ({cartData?.numOfCartItems} items)</p>
        <p>Shipping</p>
      </div>
      <div>
        <h3 className='font-semibold my-2'>{cartData?.data.totalCartPrice.toLocaleString()} EGP  </h3>
        <p className='font-bold text-right text-green-600'>Free</p>
      </div>
    </div>
    <div className="flex items-center justify-between font-bold my-2">
      <h3>Total</h3>
      <h3>{cartData?.data.totalCartPrice} EGP</h3>
    </div>
    <Button className='w-full border bg-white hover:bg-accent my-3 text-black cursor-pointer' >Continue Shopping</Button>
    <Modal cartId={cartData?.cartId!}/>
    </div>
  <button onClick={()=>clearProducts()} className='text-destructive bg-white p-2 px-3 border rounded-2xl text-xs flex items-center gap-1 cursor-pointer hover:bg-accent duration-75 ms-auto font-bold'>{isClearing ? <Loader2 className='animate-spin '/>:<Trash2 className='w-4'/>} <span>Clear Cart</span></button>
  </div>

</div> : <div className='text-muted-foreground font-semibold flex flex-col items-center justify-center min-h-75'>
  <p className='text-xl font-bold mb-4'>Your Cart Is Empty</p>
    <Link href={'/products'}>
     <Button className='bg-transparent cursor-pointer border-2 border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white'>Add Products</Button>
    </Link>
  </div> 
  }
  </div>



    </>
  )
}
