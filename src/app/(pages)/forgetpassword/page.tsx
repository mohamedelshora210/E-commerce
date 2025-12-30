'use client'
import React , { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import {  Check, LoaderCircleIcon, MoveLeft, MoveRight, LockOpen,  MailCheck, BadgeCheck, Key } from 'lucide-react';
import ForgetPassword from '@/components/ForgetPassword/Forget/ForgetPassword';
import VerifyCode from '@/components/ForgetPassword/Forget/VerifyCode';
import ResetPassword from '@/components/ForgetPassword/Forget/resetPassword';
import PasswordUpdated from '@/components/ForgetPassword/Forget/PasswordUpdated';


const steps = [
  { title: 'Forget Password', icon: MailCheck },
  { title: 'Verify Code', icon: Key },
  { title: 'Reset Password', icon: LockOpen },
  { title: 'Password Updated', icon: BadgeCheck },
];
export default function page() {

      const [currentStep, setCurrentStep] = useState(1);

        const currentStepData = steps[currentStep - 1];


     const renderStepContent = () => {
    switch (currentStepData.title) {
      case "Forget Password":
        return (<ForgetPassword
             currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />);

      case "Verify Code":
        return (<VerifyCode
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />);

      case "Reset Password":
        return (<ResetPassword
        currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />);

      case "Password Updated":
        return <PasswordUpdated/>;

      default:
        return null;
    }
}

  return (
    <>
    <div className='container mx-auto'>
         <div className=' p-7 w-full lg:w-[70%]  mx-auto mt-9 rounded-2xl shadow bg-white'>

            <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      indicators={{
        completed: <Check className="size-4" />,
        loading: <LoaderCircleIcon className="size-4 animate-spin" />,
      }}
      className="space-y-8 "
    >
      <StepperNav className="gap-3  mb-15  ">
        {steps.map((step, index) => {
          return (
            <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
              <StepperTrigger className="flex flex-col items-center justify-center gap-2.5 grow" asChild>
                <StepperIndicator className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-green-500 data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                  <step.icon className="size-4" />
                </StepperIndicator>
                <div className="flex flex-col items-center gap-1 ">
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">Step {index + 1}</div>
                  <StepperTitle className="hidden lg:block text-start text-base font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                    {step.title}
                  </StepperTitle>
                  <div className='hidden lg:block'>
                    <Badge
                      variant="secondary"

                    //   appearance="light"
                      className="hidden group-data-[state=active]/step:inline-flex bg-blue-500 text-white dark:bg-blue-600 h-8  w-full "
                    >
                      In Progress
                    </Badge>
                    <Badge
                      variant="secondary"
                      
                    //   appearance="light"
                      className="hidden group-data-[state=completed]/step:inline-flex bg-green-500 text-white dark:bg-green-600 h-8  w-full"
                    >
                      Completed
                    </Badge>
                    <Badge
                      variant="secondary"
                      
                      className="hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground h-8  w-full"
                    >
                      Pending
                    </Badge>
                  </div>
                </div>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="absolute top-4 inset-x-0 start-19 sm:start-22 md:start-26 lg:start-25 xl:start-30 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-green-500" />
              )}
            </StepperItem>
          );
        })}
      </StepperNav>
      <StepperPanel className="text-sm">
        <StepperContent value={currentStep} className="flex items-center justify-center">
            
            {renderStepContent()}
            
          </StepperContent>
      </StepperPanel>
      <div className="flex items-center justify-between gap-2.5">
        <Button className='bg-transparent hover:bg-transparent cursor-pointer hover:-translate-x-1' onClick={() => setCurrentStep((prev) => prev - 1)} disabled={currentStep === 1}>
          <MoveLeft className='text-teal-800' strokeWidth={4}/>
        </Button>
        <Button
          className='bg-transparent hover:bg-transparent cursor-pointer hover:translate-x-1'
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === steps.length}
        >
          <MoveRight className='text-teal-800' strokeWidth={4}/>
        </Button>
      </div>
    </Stepper>
         </div>
         </div>
    </>
  )
}
