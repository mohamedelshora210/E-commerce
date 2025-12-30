import { getUserToken } from "@/app/Helpers/getUserToken";
import { Button } from "@/components/ui/button";
import { VeriftTokenI } from "@/interface";
import Link from "next/link";

export default async function Header() {
    const token = await getUserToken()
    const response = await fetch(`${process.env.NEXT_BASE_URL}auth/verifyToken` , {
        headers:{
            token : token!
        }
    })
    const data : VeriftTokenI = await response.json()
  return (
    <>
        <div className=" h-[90dvh] flex flex-col items-center justify-center text-center overflow-hidden">
            <h2 className="text-3xl font-semibold animate__animated animate__bounceInLeft">Hi <span className="font-bold text-teal-800 ">{data?.decoded?.name}</span></h2>
            <div className=" font-bold my-4 flex gap-2 items-center "><span className="sm:text-6xl text-5xl animate__animated animate__zoomIn animate__delay-1s">Welcome To</span> <span className='sm:text-4xl text-3xl animate__animated animate__fadeInRightBig animate__delay-1s'> Stylish <br/> <span className='text-teal-800'>Online</span> store</span></div>
            <p className="text-xl font-semibold text-muted-foreground w-[70%] animate__animated animate__fadeInUp animate__delay-2s">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
            <div className="flex gap-6 my-5">
                <Link href={'/products'}><Button className="duration-200 bg-teal-700 hover:scale-105 border-3 border-teal-700 hover:border-teal-800 hover:bg-teal-800 cursor-pointer text-xl px-7 py-6 animate__animated animate__fadeInDown animate__delay-3s">Shop Now</Button></Link>
                <Link href={'/categories'}><Button className=" duration-200 bg-transparent hover:scale-105 border-3 text-teal-800 border-teal-700 hover:border-teal-800 hover:text-white hover:bg-teal-800 cursor-pointer text-xl px-7 py-6 animate__animated animate__fadeInUp animate__delay-3s">Browse Categories</Button></Link>
            </div>
        </div>
    </>
  )
}
