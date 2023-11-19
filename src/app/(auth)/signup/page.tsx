"use client";
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import {SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/Loader';
import { Brain, MailCheck } from 'lucide-react';
import { LoginUser, actionSignUpUser } from '@/lib/server-actions/auth';
import clsx from 'clsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Props = {}

const SignUpFormSchema = z
  .object({
    email: z.string().describe('Email').email({message: 'Invalid Email'}),
    password: z.string().describe('Password').min(6, 'Password must be minimum 6 characters'),
    confirmPassword: z.string().describe('Confirm Password').min(6, 'Password must be minimum 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignUp = (props: Props) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string>("");
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const searchParams = useSearchParams();

    const errorFound = useMemo(()=>{
        if(!searchParams) return '';
        return searchParams.get('error_description');
    },[searchParams]);

    const confirmationAndError = useMemo(()=>clsx('bg-white', {
      'bg-rose-500/10' : errorFound,
      'border-rose-500/50' : errorFound,
      'text-rose-700' : errorFound
    }),[errorFound])

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(SignUpFormSchema),
        defaultValues:{email: '', password: '', confirmPassword: ''},
    })
    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async({email, password}:z.infer<typeof FormSchema>) => {
      console.log(submitError);
      const { error, data } = await actionSignUpUser({ email, password });
      if (error) {
        setSubmitError(error.message);
        form.reset();
        return;
      }
      setConfirmation(true);
    }

    const Handler = (event: React.MouseEvent)=>{
      event.preventDefault();
      router.push('/auth/signup');
    };

    return (
        <Form {...form}>
            <form className='flex flex-col gap-4 bg-black/20 p-6 rounded-xl' onChange={()=>{if(submitError) setSubmitError('')}} onSubmit={form.handleSubmit(onSubmit)}>
                <Link href={'/'} className=''>
                    <Button className='bg-transparent flex justify-end items-end gap-2 p-0 hover:bg-transparent'>
                        <p className='font-extrabold text-end text-transparent text-3xl bg-clip-text bg-gradient-to-r from-rose-300 to-rose-500 dark:bg-gradient-to-r dark:from-violet-300 dark:to-violet-400'>Context</p> 
                        <span className='pb-0.5'>by Khyal AI</span>
                    </Button>
                </Link>
                <FormDescription className='text-white'>
                    Plan, Collaborate and Build Exceptional Software.
                </FormDescription>
                {!confirmation && !errorFound && 
                   (
                    <>  
                    <FormField disabled={isLoading} control={form.control} name='email' render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input type='email' placeholder='Email' {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                    <FormField disabled={isLoading} control={form.control} name='password' render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input type='password' placeholder='Password' {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                    <FormField disabled={isLoading} control={form.control} name='confirmPassword' render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input type='password' placeholder='Confirm Password' {...field}/>
                        </FormControl>
                    </FormItem>
                    )}/>
                    <Button type='submit' className='rounded-3xl flex flex-row justify-center items-center text-sm text-white outline outline-2 outline-white/30' size={"lg"} disabled={isLoading}>
                      {!isLoading ? "Create Account":<Loader/>}
                    </Button>
                    </>
                   )}
                {submitError && (<FormMessage>{submitError}</FormMessage>)}
                <span className='text-white flex flex-row gap-1'>
                    Already have an account?
                    <Link href={'/login'} className='text-end text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-500 dark:bg-gradient-to-r dark:from-violet-300 dark:to-violet-400'>
                        Login
                    </Link>
                </span>
                {(confirmation || errorFound) && 
                <>
                  <Alert className={confirmationAndError}>
                    <AlertTitle>
                      {errorFound ? "Invalid Link" : <span className='flex flex-row gap-2'>Check your Email<MailCheck className='h-4 w-4'/></span>}
                    </AlertTitle>
                    <AlertDescription>{errorFound || 'An email confirmation has been sent.'}</AlertDescription>
                  </Alert>
                </>
                }
            </form>
        </Form>
    )
}

export default SignUp