import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { MessageSquareIcon } from 'lucide-react'

type Props = {}

const NavHeader = (props: Props) => {
  const session = true;  
  return (
    <header className='sticky top-0 z-50 backdrop-blur-sm mx-auto'>
      <nav className='flex justify-between max-w-7xl gap-3 flex-col sm:flex-row items-center p-5 bg-none mx-auto'>
        <Link href={'/'} className=''>
                    <Button className='bg-transparent flex justify-end items-end gap-2 p-0 hover:bg-transparent'>
                        <p className='font-extrabold text-end text-transparent text-3xl bg-clip-text bg-gradient-to-r from-rose-300 to-rose-500 dark:bg-gradient-to-r dark:from-violet-300 dark:to-violet-400'>Context</p> 
                        <span className='pb-0.5'>by Khyal AI</span>
                    </Button>
        </Link>
        <div className='flex flex-row justify-center items-center gap-4'>
        <Link href={'/login'}>
            <Button className='rounded-3xl h-10 flex flex-row justify-center items-center text-sm text-white outline outline-2 outline-white/30' size={"lg"}>
                Login
            </Button>
        </Link>
        <Link href={'/signup'}>
            <Button className='rounded-3xl h-10 flex flex-row justify-center items-center text-sm text-white outline outline-2 outline-teal-400/90' size={"lg"}>
                Sign Up
            </Button>
        </Link>
        </div>
      </nav>
    </header>
  )
}

export default NavHeader