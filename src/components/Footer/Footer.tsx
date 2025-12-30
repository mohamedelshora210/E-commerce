import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import img from '../../../public/images/main-logo.png'
import Image from 'next/image'


export default function Footer() {
  return (
    <>
    <footer >
        <div className="container mx-auto">
            <div className=" text-sm mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-7 border-t border-teal-600 ">
                <div>
                    <Image src={img} alt='' width={300} height={300} className='w-25 h-13 mb-4'/>
                    <ul className='list-none text-gray-700 space-y-4'>
                        <li className=''><p>Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p></li>
                        <li className='flex  items-center gap-2'><MapPin className='w-4 h-4 text-yellow-600'strokeWidth={3.5}/> <span>123 Shop Street, Octoper City, DC 12345</span></li>
                        <li className='flex  items-center gap-2 hover:text-teal-700 font-semibold duration-300 cursor-pointer'><Phone strokeWidth={3.5} className='w-4 h-4 text-green-800'/> <span>(+20) 01093333333</span></li>
                        <li className='flex  items-center gap-2 hover:text-teal-700 font-semibold duration-300 cursor-pointer'><Mail strokeWidth={2.5} className='w-4 h-4 '/> <span>support@shopmart.com</span></li>
                    </ul>
                </div>
                <div>
                    <h2 className=' font-bold mb-5'>SHOP</h2>
                    <ul className='
                    list-none text-gray-700 space-y-4 
                    [&>li]:hover:text-teal-800
                    [&>li]:duration-200
                    
                    '
                    >
                        <li>
                            <Link href={'/categories'}>
                                Electronics
                            </Link>
                        </li>
                        <li>
                            <Link href={'/categories'}>
                                Fashion
                            </Link>
                        </li>
                        <li>
                            <Link href={'/categories'}>
                                Home & Garden
                            </Link>
                        </li>
                        <li>
                            <Link href={'/categories'}>
                                Sports
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Deals
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className=' font-bold mb-5'>CUSTOMER SERVICE</h2>
                    <ul className='
                    list-none text-gray-700 space-y-4 
                    [&>li]:hover:text-teal-800
                    [&>li]:duration-200
                    
                    '
                    >
                        <li>
                            <Link href={'/'}>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Track Your Order
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Returns & Exchanges
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Size Guide
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className=' font-bold mb-5'>ABOUT</h2>
                    <ul className='
                    list-none text-gray-700 space-y-4 
                    [&>li]:hover:text-teal-800
                    [&>li]:duration-200
                    
                    '
                    >
                        <li>
                            <Link href={'/'}>
                                About shopmart
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Press
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Investor Relations
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Sustainability
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className=' font-bold mb-5'>POLICIES</h2>
                    <ul className='
                    list-none text-gray-700 space-y-4 
                    [&>li]:hover:text-teal-800
                    [&>li]:duration-200
                    
                    '
                    >
                        <li>
                            <Link href={'/'}>
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                               Cookie Policy
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Shipping Policy
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                Refund Policy
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </footer>
    </>
  )
}
