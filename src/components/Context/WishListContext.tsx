'use client'
import { createContext, ReactNode, useEffect, useState } from "react";
import { WishListI } from "@/interface";

export const WishListContext = createContext<{

    wishListData : WishListI | null,
    setWishListData : (value : WishListI | null)=>void,
    isLoadingWishList : boolean,
    setIsLoadingWishList : (value : boolean)=>void,
    getWishList : ()=>void
}>({
    wishListData : null,
    setWishListData : ()=>{},
    isLoadingWishList : false,
    setIsLoadingWishList : ()=>{},
    getWishList :()=>{}
})

export default function WishListContextProvider ({children} : {children : ReactNode}){

    const [wishListData, setWishListData] = useState <WishListI | null>(null)
    const [isLoadingWishList, setIsLoadingWishList] = useState<boolean>(false)
    async function getWishList (){
        setIsLoadingWishList(true)
        const response = await fetch(`/api/get-wishList`)
        const data = await response.json()
        setWishListData(data)
        setIsLoadingWishList(false)
    }
    useEffect(()=>{
        getWishList()
    },[])

    return <WishListContext.Provider value={{getWishList , wishListData , setWishListData ,isLoadingWishList , setIsLoadingWishList}}>
        {children} 
    </WishListContext.Provider>
}