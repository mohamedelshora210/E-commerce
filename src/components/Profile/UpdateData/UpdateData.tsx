
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
import {  FileText, Loader2} from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { updateData } from './updateData.action'

 
export const formSchema = z.object({
    name: z.string().min(3, {message: "Username must be at least 2 characters."}),
    email : z.string().email('Enter Valid Email'),
    phone : z.string().nonempty('Phone is Required').regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/ , 'Enter Valid Number')

})


export default function UpdateData() {

        const [isLoading, setIsLoading] = useState(false)
        const [open, setOpen] = useState(false)

     const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          phone:'',
        },
      })
     
      async function onSubmit(values: z.infer<typeof formSchema>) {  
        setIsLoading(true)
        const data = await updateData(values)
        if(data.message == 'success')
    {
        toast.success('Data is updated')
    }
        if(data.message == 'fail')
    {
        toast.error(data.errors.msg )
    }

    setIsLoading(false)
    setOpen(false)
      }
  return (
    <>
            <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className='group hover:shadow-teal-600 duration-200 cursor-pointer mt-3'>
          Update Data <FileText strokeWidth={3} className='group-hover:text-teal-700 duration-200' />
        </Button>
      </DialogTrigger>
    
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='font-bold text-teal-800'>Update Data</DialogTitle>
        </DialogHeader>
    
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className='mb-4'>
                        <FormLabel>Name </FormLabel>
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type='email' placeholder="Ex : example@ex.ex" {...field} />
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
                        <FormLabel>Phone </FormLabel>
                        <FormControl>
                          <Input type='tel' placeholder="Ex : 01*********" {...field} />
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
