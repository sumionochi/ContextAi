"use client";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/Loader';
import { Brain } from 'lucide-react';
import { LoginUser } from '@/lib/server-actions/auth';

type Props = {}

const Login = (props: Props) => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState("");
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues:{email: '', password: ''},
    })
    const isLoading = form.formState.isSubmitting;
    const onSubmit : SubmitHandler<z.infer<typeof FormSchema>> = async(FormData) => {
        const {error} = await LoginUser(FormData);
        if(error){
            form.reset();
            setSubmitError(error.message);
        }
        router.replace('/workspace');
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
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button type='submit' className='rounded-3xl flex flex-row justify-center items-center text-sm text-white outline outline-2 outline-white/30' size={"lg"} disabled={isLoading}>
                    {!isLoading ? "Login":<Loader/>}
                </Button>
                <span className='text-white flex flex-row gap-1'>
                    Don't have an account?
                    <Link href={'/signup'} className='text-end text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-500 dark:bg-gradient-to-r dark:from-violet-300 dark:to-violet-400'>
                        Sign Up
                    </Link>
                </span>
            </form>
        </Form>
    )
}

export default Login