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
import { Eye, EyeClosed, Loader2, Lock, MailIcon } from "lucide-react"
import toast from "react-hot-toast"
import { useState } from "react"
import { resetPassword } from "./action/resetPassword"
 
export const formSchema = z.object({
  email: z.string().email('Enter Valid Email'),
  newPassword : z.string().nonempty('Password is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Your Password Must Be Strong')
})

type ReactStateNumber = React.Dispatch<React.SetStateAction<number>>
export default function ResetPassword({setCurrentStep , currentStep} : {setCurrentStep : ReactStateNumber , currentStep:number}) {

    const [isLoading, setIsLoading] = useState(false)
    const [eyePassword, setEyePassword] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword:''
    },
  })

async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const data = await resetPassword(values)
    if(data.statusMsg == 'fail')
    {
        toast.error(data.message)
    }
    else
    {
      toast.success('Password is changed')
      setCurrentStep(currentStep +1)
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

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field , fieldState }) => (
            <FormItem>
              <FormLabel>New Password<span className='text-red-600 font-bold'>*</span></FormLabel>
              <FormControl>
                
                    <InputGroup className={fieldState.invalid ? 'border-destructive has-[[data-slot=input-group-control]:focus-visible]:border-destructive has-[[data-slot=input-group-control]:focus-visible]:ring-destructive/50 ' : ''}>
                        <InputGroupInput type={eyePassword ? 'text' : 'password'} placeholder="Enter new password" {...field}  />
                        <span className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-teal-800' onClick={()=>setEyePassword(!eyePassword)}> {eyePassword?  <Eye/> : <EyeClosed /> }</span>
                    <InputGroupAddon>
                    <Lock className={fieldState.invalid ? 'text-destructive':''}/>
                    </InputGroupAddon>
                </InputGroup>

              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer bg-teal-800 hover:bg-teal-600 w-41">{isLoading ? <Loader2 className="animate-spin"/> : <span>Reset Password</span>}</Button>
     
      </form>
    </Form>
     </div>
    
    </>
  )
}
