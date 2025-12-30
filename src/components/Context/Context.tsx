'use client'
import { getUserToken } from "@/app/Helpers/getUserToken";
import { CartResponseI } from "@/interface";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData : CartResponseI | null,
  setCartData : (value : CartResponseI | null)=>void,
  isLoading : boolean , 
  setIsLoading : (value : boolean)=>void,
  getCart : ()=>void
}>({
  cartData : null,
  setCartData : ()=>{},
  isLoading : false , 
  setIsLoading : ()=>{},
  getCart : ()=>{}
})

export default function CartContextProvider({children} : {children : ReactNode}){
  const [cartData, setCartData] = useState<CartResponseI | null>(null)
  const [isLoading, setIsLoading] = useState(false)
      async function getCart(){
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/api/get-cart')

        const data : CartResponseI = await response.json()
        setCartData(data)
        setIsLoading(false)
            
      }
    useEffect(()=>{
      getCart()
    },[])

    return <CartContext.Provider value={{cartData , setCartData , isLoading , setIsLoading ,getCart}}>
        {children}
    </CartContext.Provider>
}