import CredentialsProvider from "next-auth/providers/credentials"
import { ErrorResponseLogin, SuccessResponseLogin } from "@/interface"
import { AuthOptions } from "next-auth"


export const authOptions : AuthOptions = {
providers : [
    CredentialsProvider({
        name : 'credential',
        credentials : {
            email : {},
            password : {}
        },
        authorize : async (credentials)=>{
            const response = await fetch(`${process.env.NEXT_BASE_URL}auth/signin`,{
                method : 'POST',
                body : JSON.stringify({
                    email : credentials?.email,
                    password : credentials?.password
                }),
                headers : {'content-type' : 'application/json'}
            })
            const payload : SuccessResponseLogin | ErrorResponseLogin = await response.json()
            console.log(payload);
            if('token' in payload)
            {
                return {
                id : payload.user.email,
                user : payload.user,
                token : payload.token
            }
            }
            else 
            {
                throw new Error(payload.message)
            }
            
        }    
    })
],
 callbacks : {
            jwt : ({token , user})=>{
                if(user){
                    token.user = user.user,
                    token.token = user.token
                }
                return token
            },
            session : ({session , token})=>{
                session.user = token.user
                return session
            }
        },
        pages : {
            signIn:'/signin',
            error:'/signin'
        },
        secret : process.env.NEXT_AUTH_SECRET
    
}