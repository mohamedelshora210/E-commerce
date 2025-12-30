
'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed, Loader2, Lock } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { updatePassword } from './updatePassword.action'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

 
export const formSchema = z.object({
  currentPassword: z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Your Password Must Be Strong'),
  newPassword: z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Your Password Must Be Strong'),
  rePassword : z.string().nonempty('Password is Required'),

}).refine((data)=>data.newPassword === data.rePassword , {path : ['rePassword'] , message : 'password & rePassword Must be the same'})

export default function UpdatePassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [eyeCurrentPassword, setEyeCurrentPassword] = useState(false)
    const [eyeNewPassword, setEyeNewPassword] = useState(false)
    const [eyeRePassword, setEyeRePassword] = useState(false)
    const [open, setOpen] = useState(false)


      const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      rePassword:'',
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
   
    const  data  = await updatePassword(values)
    if(data.message == 'success')
    {
        toast.success('Password is updated')
       await signIn('credentials' , {
            email : data.user.email,
            password : values.newPassword,
            redirect: false
        })
    }

    setIsLoading(false)
    setOpen(false)
  }
  return (
    <>
          <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button type="button" variant="outline" className='group hover:shadow-teal-600 duration-200 cursor-pointer mt-3'>
      Update Password <Lock strokeWidth={3} className='group-hover:text-teal-700 duration-200' />
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle className='font-bold text-teal-800'>Update Password</DialogTitle>
    </DialogHeader>

    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="currentPassword"
        render={({ field , fieldState }) => (
          <FormItem>
            <FormLabel>Current Password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input type={eyeCurrentPassword ? 'text' : 'password'} placeholder="Current Password" {...field} className={fieldState.invalid ? 'border-red-500 focus-visible:border-red-500 focus-visible:red-500-red-500/50 focus-visible:red-500-[3px]' : ''} />
              <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-teal-800' onClick={()=>setEyeCurrentPassword(!eyeCurrentPassword)}> {eyeCurrentPassword?  <Eye/> : <EyeClosed /> }</span>
           
              </div>
               </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="newPassword"
        render={({ field , fieldState}) => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input  type={eyeNewPassword ? 'text' : 'password'} placeholder="New Password" {...field} className={fieldState.invalid ? 'border-red-500 focus-visible:border-red-500 focus-visible:red-500-red-500/50 focus-visible:red-500-[3px]' : ''}/>
              <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-teal-800' onClick={()=>setEyeNewPassword(!eyeNewPassword)}> {eyeNewPassword?  <Eye/> : <EyeClosed /> }</span>
           
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rePassword"
        render={({ field , fieldState}) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div className='relative'>
                <Input  type={eyeRePassword ? 'text' : 'password'} placeholder="Confirm Password" {...field} className={fieldState.invalid ? 'border-red-500 focus-visible:border-red-500 focus-visible:red-500-red-500/50 focus-visible:red-500-[3px]' : ''}/>
                <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-teal-800' onClick={()=>setEyeRePassword(!eyeRePassword)}> {eyeRePassword?  <Eye/> : <EyeClosed /> }</span>
           
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <DialogFooter className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" className='cursor-pointer'>Cancel</Button>
        </DialogClose>
        <Button type="submit" className="bg-teal-700 hover:bg-teal-800 cursor-pointer">
           <span className='flex gap-2 items-center'>Save changes {isLoading && <Loader2 className = 'animate-spin'/> }</span>
        </Button>
      </DialogFooter>
    </form>
    </Form>
  </DialogContent>
</Dialog>
    </>
  )
}
