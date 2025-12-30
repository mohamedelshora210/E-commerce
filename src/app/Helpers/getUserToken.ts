import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken(){
    const MyCookies = await cookies()
    const MyToken = MyCookies.get('next-auth.session-token')?.value || MyCookies.get('__Secure-next-auth.session-token')?.value 
    const secretToken = await decode({
        token : MyToken,
        secret : process.env.NEXT_AUTH_SECRET!
    })
    return secretToken?.token
}