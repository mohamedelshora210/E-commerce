import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken(){
    const x = (await cookies()).get('next-auth.session-token')?.value
    const secretToken = await decode({
        token : x,
        secret : process.env.NEXT_AUTH_SECRET!
    })
    return secretToken?.token
}