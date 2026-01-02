'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,

} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HeartIcon, Loader2, Menu, ShoppingCartIcon, UserIcon, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { CartContext } from '../Context/Context'
import { WishListContext } from '../Context/WishListContext'
import { signOut, useSession } from 'next-auth/react'
import { AnimatePresence, motion } from "framer-motion";
import Profile from '../Profile/Profile'
import Image from 'next/image'
import img from '../../../public/images/main-logo.png'

export default function Navbar() {
    const pathname = usePathname()
    const {cartData , isLoading} =useContext(CartContext)
    const {wishListData ,isLoadingWishList} =useContext(WishListContext)

    const [toggle, setToggle] = useState(false)

    const session = useSession()
    console.log(session);
    
  return (
    <>
    <nav className={`py-3 px-2 bg-accent/90 border-b border-muted text-2xl font-semibold z-50 fixed top-0 inset-x-0 `}>
        <div className="container mx-auto ">
        <div className="flex  items-center justify-between">
            <div className='ps-3 sm:ps-0 order-1 md:order-0'>
                <Link href={'/'}><Image src={img} alt='' width={300} height={300} className='w-25 h-13'/></Link>
            </div>
            <NavigationMenu className='hidden md:block' >
                <NavigationMenuList className='flex sm:flex-row flex-col mb-2'>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild >
                        <Link href="/products" className={pathname == '/products' ? 'active' : ''}>Products</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink  asChild>
                        <Link href="/brands" className={pathname == '/brands' ? 'active' : ''}>brands</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/categories" className={pathname == '/categories' ? 'active' : ''}>categories</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                
                </NavigationMenuList>
            </NavigationMenu>

            <div className="flex order-0 md:order-1 items-center ">
                <DropdownMenu >
                    <DropdownMenuTrigger className= {pathname == '/profile' ||pathname == '/signin' || pathname =='/signup' ? 'active cursor-pointer' : 'cursor-pointer hover:text-teal-600 duration-300'}><UserIcon/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {session.status == 'authenticated' ? <>
                        <DropdownMenuItem asChild className='cursor-pointer'><Profile name={session?.data?.user.name}/></DropdownMenuItem>
                        <Link href={'/allorders'}><DropdownMenuItem className='cursor-pointer'>All Orders</DropdownMenuItem></Link>
                        <DropdownMenuItem onClick={()=>{signOut({callbackUrl:'/'})}} className='cursor-pointer'>logOut</DropdownMenuItem>
                        </> : <>
                        <Link href={'/signin'}><DropdownMenuItem className='cursor-pointer'>signin</DropdownMenuItem></Link>
                        <Link href={'/signup'}><DropdownMenuItem className='cursor-pointer'>signup</DropdownMenuItem></Link>
                        </>
                        }
                        
                    </DropdownMenuContent>
                    </DropdownMenu>

                    {session.status=='authenticated' && <>
                    <div className='ms-3 relative'>
                        <Link href={'/wishlist'}>
                        <HeartIcon className={pathname == '/wishlist' ? 'text-red-600 fill-red-600' : 'hover:text-teal-600 duration-300'}/>
                        <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2">
                            {isLoadingWishList ? <Loader2 className='animate-spin'/> : wishListData?.count}
                        </Badge>
                        </Link>
                    </div>

                    <div className='ms-3 relative'>
                        <Link href={'/cart'}>
                        <ShoppingCartIcon className={pathname == '/cart' ? 'active' : 'hover:text-teal-600 duration-300'}/>
                        <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2">
                            {isLoading ? <Loader2 className='animate-spin'/> : cartData?.numOfCartItems}
                        </Badge>
                        </Link>
                    </div>
                    </>}
            </div>

         <AnimatePresence mode="wait">
  <motion.div
    key={toggle ? "close" : "menu"}
    className="order-2 md:hidden"
    initial={{ rotate: toggle ? -90 : 90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    exit={{ rotate: toggle ? 90 : -90, opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    {toggle ? (
      <X
        className="cursor-pointer text-red-600"
        onClick={()=>{setToggle(!toggle)}}
      />
    ) : (
      <Menu
        className="cursor-pointer text-teal-700"
        onClick={()=>{setToggle(!toggle)}}
      />
    )}
  </motion.div>
</AnimatePresence>
       
    </div>
    <div>

        <AnimatePresence>
  {toggle && (
    <motion.div
      initial={{ opacity: 0, scale:0}}
      animate={{ opacity: 1, scale:1 }}
      exit={{ opacity: 0, scale:0}}
      transition={{ duration: 0.5 }}
    >
      <NavigationMenu >
                <NavigationMenuList className='flex md:hidden flex-col my-2'>
                <NavigationMenuItem >
                    <NavigationMenuLink asChild >
                        <Link href="/products" className={pathname == '/products' ? 'active' : ''}>Products</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink  asChild>
                        <Link href="/brands" className={pathname == '/brands' ? 'active' : ''}>brands</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/categories" className={pathname == '/categories' ? 'active' : ''}>categories</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                
                </NavigationMenuList>
            </NavigationMenu>
    </motion.div>
  )}
</AnimatePresence>
         

            
    </div>
    </div>
    </nav>
    </>
  )
}
