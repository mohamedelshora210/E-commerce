import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prodectedPages = ['/cart' , '/profile']
const authPages = ['/signin' , '/signup']
export default async function proxy(req : NextRequest){
    const token = await getToken({req})
    if(prodectedPages.includes(req.nextUrl.pathname))
    {
        if(token)
        {
            return NextResponse.next()
        }
        else 
        {
            const redirectURL = new URL('/signin' ,process.env.NEXT_URL)
            return NextResponse.redirect(redirectURL)
        }
    }

    if(authPages.includes(req.nextUrl.pathname))
    {
        if(!token)
        {
            return NextResponse.next()
        }
        else 
        {
            const redirectURL = new URL('/' ,process.env.NEXT_URL)
            return NextResponse.redirect(redirectURL)
        }
    }
    return NextResponse.next()

}