"use client"
 
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import Link from "next/link"
import { Loader2, MailIcon } from "lucide-react"
import { forgetPassword } from "./action/forgetPassword"
import toast from "react-hot-toast"
import { useState } from "react"
 
export const formSchema = z.object({
  email: z.string().email('Enter Valid Email'),
  
})
 
type ReactStateNumber = React.Dispatch<React.SetStateAction<number>>
export default function ForgetPassword({setCurrentStep , currentStep} : {setCurrentStep : ReactStateNumber , currentStep:number}) {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const data = await forgetPassword(values)
    if (data.statusMsg == 'success')
    {
        toast.success(data.message)
        setCurrentStep(currentStep+1)
    }
    if (data.statusMsg == 'fail')
    {
        toast.error(data.message)
    }
    if (data.statusMsg == 'error')
    {
        toast.error(data.message)
    }
    setIsLoading(false)
  }
  return (
    <>
     <div className="flex items-center justify-center w-full">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-full lg:w-[75%] p-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field , fieldState }) => (
            <FormItem>
              <FormLabel>Email address<span className='text-red-600 font-bold'>*</span></FormLabel>
              <FormControl>
                
                    <InputGroup className={fieldState.invalid ? 'border-destructive has-[[data-slot=input-group-control]:focus-visible]:border-destructive has-[[data-slot=input-group-control]:focus-visible]:ring-destructive/50 ' : ''}>
                        <InputGroupInput placeholder="Enter your email" {...field}  />
                    <InputGroupAddon>
                    <MailIcon className={fieldState.invalid ? 'text-destructive':''}/>
                    </InputGroupAddon>
                </InputGroup>

              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer bg-teal-800 hover:bg-teal-600 w-41">{isLoading ? <Loader2 className="animate-spin"/> : <span>Send Verification code</span>}</Button>
     
          <h2 className='font-semibold'>Remember your password ? <Link className='font-bold text-teal-800' href='/signin'>SignIn</Link></h2>
      </form>
    </Form>
     </div>
    </>
  )
}
