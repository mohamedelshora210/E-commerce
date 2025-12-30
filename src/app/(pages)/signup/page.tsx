
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
import { PostRegister } from '@/components/PostRegister/PostRegister-action'
import { useRouter } from 'next/navigation'
 
export const formSchema = z.object({
  name: z.string().min(3, {message: "Username must be at least 2 characters."}),
  email : z.string().email('Enter Valid Email'),
  password :z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Your Password Must Be Strong'),
  rePassword : z.string().nonempty('Password is Required'),
  phone : z.string().nonempty('Phone is Required').regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/ , 'Enter Valid Number')
}).refine((data)=>data.password === data.rePassword , {path : ['rePassword'] , message : 'password & rePassword Must be the same'})


 

export default function SignUp() {

  const [eyePassword, setEyePassword] = useState(false)
  const [eyeRePassword, setEyeRePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<{message : string}|null>(null)

 const router = useRouter()
  
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email : "",
      password:'',
      rePassword:'',
      phone :''

    },
    mode : 'onChange',
    reValidateMode : 'onChange'
  })
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const data = await PostRegister(values)
    setResponse(data)
    if(data.message == 'success'){
      router.push('/signin')
    } 
    setIsLoading(false)
  }
  

  return (
    <>
    <section className={` container mx-auto min-h-[85dvh] my-3 bg-[url('/images/signup.jpg')] rounded-2xl  overflow-auto bg-cover bg-[position:90%_50%] lg:bg-[position:50%_100%] bg-no-repeat `}>
       
        <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-white lg:w-2/5 p-5 mx-6 my-5 rounded-2xl ">
       <h1 className='text-2xl font-bold text-center text-teal-800 mx-6 mt-1 mb-3 capitalize'>Register now and Join US</h1>
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Name <span className='text-red-600 font-bold'>*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel>Password <span className='text-red-600 font-bold'>*</span></FormLabel>
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

        <FormField
          control={form.control}
          name="rePassword"
          render={({ field , fieldState }) => (
            <FormItem className='mb-4'>
              <FormLabel>Confirm Password <span className='text-red-600 font-bold'>*</span></FormLabel>
              <FormControl>
                <div className='relative'>
                <Input type={eyeRePassword ? 'text' : 'password'} placeholder="Ex : Example@123" {...field} className={fieldState.invalid ? 'border-red-500 focus-visible:border-red-500 focus-visible:red-500-red-500/50 focus-visible:red-500-[3px]' : ''}/>
                <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-teal-800' onClick={()=>setEyeRePassword(!eyeRePassword)}> {eyeRePassword?  <Eye/> : <EyeClosed /> }</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className='mb-4'>
              <FormLabel>Phone <span className='text-red-600 font-bold'>*</span></FormLabel>
              <FormControl>
                <Input type='tel' placeholder="Ex : 01*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='cursor-pointer w-full mb-4 bg-teal-800 hover:bg-teal-700' type="submit">{isLoading ? <Loader2 className='animate-spin '/> : 'Sign Up'}</Button>
          {response?.message=='success'? <p className='text-green-600 font-bold'>{response?.message}</p> : <p className='text-red-600 font-bold'>{response?.message}</p>}
        <h2 className='font-semibold'>Does have an account ? <Link className='font-bold text-teal-800' href='/signin'>Sign In</Link></h2>
      </form>
    </Form>
    </section>
    </>
  )
}
