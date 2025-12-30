"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { useState } from "react"
import { verifyResetCode } from "./action/verifyResetCode"
import Link from "next/link"
 
export const formSchema = z.object({
  resetCode: z.string().min(3 , 'Enter valid code'),

})
type ReactStateNumber = React.Dispatch<React.SetStateAction<number>>
export default function VerifyCode({setCurrentStep , currentStep} : {setCurrentStep : ReactStateNumber , currentStep:number}) {

        const [isLoading, setIsLoading] = useState(false)
        const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          resetCode: "",
        },
      })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const data = await verifyResetCode(values)
        if(data.status == 'Success')
        {
            toast.success(data.status)
            setCurrentStep(currentStep +1)
        }
        if (data.statusMsg == 'fail')
        {
        toast.error(data.message)
        }
        setIsLoading(false)
        
      }

      const otpErrorClass = 'border-red-600 ring-red-600/30 data-[active=true]:border-red-600 data-[active=true]:ring-red-600/50';
  return (
    <>
        <div className="flex items-center justify-center w-full">
                <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-full lg:w-[75%]  flex flex-col items-center p-5">
                <FormField
                  control={form.control}
                  name="resetCode"
                  render={({ field , fieldState }) => (
                    <FormItem>
                      <FormLabel className="mx-auto mb-2 text-lg">Verify Reset Code</FormLabel>
                        <FormDescription className="mb-2">Enter the reset code from your email to continue</FormDescription>
                      <FormControl>
                        
                            <InputOTP maxLength={6} {...field}  >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} className={fieldState.invalid ? otpErrorClass : ''} />
                                    <InputOTPSlot index={1} className={fieldState.invalid ? otpErrorClass : ''}/>
                                    <InputOTPSlot index={2} className={fieldState.invalid ? otpErrorClass : ''}/>
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} className={fieldState.invalid ? otpErrorClass : ''}/>
                                    <InputOTPSlot index={4} className={fieldState.invalid ? otpErrorClass : ''}/>
                                    <InputOTPSlot index={5} className={fieldState.invalid ? otpErrorClass : ''}/>
                                </InputOTPGroup>
                                </InputOTP>
        
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="cursor-pointer bg-teal-800 hover:bg-teal-600 w-41">{isLoading ? <Loader2 className="animate-spin"/> : <span>Verify Code</span>}</Button>
                <h2 className='font-semibold'>Remember your password ? <Link className='font-bold text-teal-800' href='/signin'>SignIn</Link></h2>
              </form>
            </Form>
             </div>
    </>
  )
}
