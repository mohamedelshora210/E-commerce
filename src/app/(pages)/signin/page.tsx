'use client'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Eye, EyeClosed, Loader2 } from 'lucide-react'
import {signIn} from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
 
export const formSchema = z.object({
  email : z.string().email('Enter Valid Email'),
  password :z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Your Password Must Be Strong'),
})


export default function Signin() {

    const [eyePassword, setEyePassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
const searchParams =  useSearchParams()

  type InputField = z.infer<typeof formSchema>
    const form = useForm<InputField>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email : "",
          password:'',
    
        },
        mode : 'onChange',
        reValidateMode : 'onChange'
      })
         async function onSubmit(values: InputField) {
          setIsLoading(true)
         const response = await signIn('credentials' , {
          email : values.email,
          password : values.password,
          callbackUrl:'/',
          redirect:true
         })
            setIsLoading(false)
        }
  return (
    <>
    <section className={` container mx-auto min-h-[84dvh] flex items-center my-3 bg-[url('/images/login.jpg')] rounded-2xl  overflow-auto bg-cover bg-[position:50%_56%]  bg-no-repeat `}>
       
        
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-white w-full lg:w-2/5 p-5 mx-6 my-5 rounded-2xl ">
       <h1 className='text-2xl font-bold text-center text-teal-800 mx-6 mt-1 mb-3 capitalize'>Login Now</h1>
        

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Email<span className='text-red-600 font-bold'>*</span></FormLabel>
              <FormControl>
                <Input type='email' placeholder="Ex : example@ex.ex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field , fieldState  }) => (
            <FormItem className='mb-4'>
              <div className='flex items-center justify-between'><FormLabel ><span>Password <span className='text-red-600 font-bold'>*</span></span> </FormLabel><span ><Link className='text-sm font-semibold hover:text-teal-800 duration-200' href={'/forgetpassword'}>Forget?</Link></span></div>
              <FormControl >
                <div className='relative '>
                <Input type={eyePassword ? 'text' : 'password'} placeholder="Ex : Example@123" {...field} className={fieldState.invalid ? 'border-red-500 focus-visible:border-red-500 focus-visible:red-500-red-500/50 focus-visible:red-500-[3px]' : ''}/>
                <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-teal-800' onClick={()=>setEyePassword(!eyePassword)}> {eyePassword?  <Eye/> : <EyeClosed /> }</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        
        <Button className='cursor-pointer w-full mb-4 bg-teal-800 hover:bg-teal-700' type="submit">{isLoading ? <Loader2 className='animate-spin '/> : 'LogIn'}</Button>
       {searchParams.get('error') && <p className='text-red-600 font-semibold text-center mb-2'>{searchParams.get('error')}</p>}
        <h2 className='font-semibold'>Doesn't have an account ? <Link className='font-bold text-teal-800' href='/signup'>SignUp</Link></h2>
      </form>
    </Form>
        
    </section>
    
    </>
  )
}
