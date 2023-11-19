import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Title from '@/components/Title';
import poster from '@/app/poster.png'
import { ArrowUpRight, BookText, Bot, BotIcon, FolderSearch, Github, Key, Linkedin, Lock, Mail, MousePointer2, Pen, ScrollText, Text, TextCursor, Users } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className='relative'>
      <section className='flex p-4 flex-col gap-20 pb-24'>
        <section className='flex flex-col gap-4 pt-28 sm:pt-48'>
          <Title pill="✨ Your Workspace, Perfected" title="Plan, Collaborate and Build Exceptional Software: A Productivity Platform For Developers" subheading='Enhancing your development workflow with real-time collaboration, AI assistance, Rich Workspace Environment and much more...'/>
        </section>
        <section>
          
        </section>
        <section className='flex flex-col gap-10'>
          <section className='grid sm:mx-auto text-white max-w-7xl gap-4 place-items-start sm:place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 grid-cols-1'>
              <Button className='rounded-3xl flex flex-row justify-center items-center pb-2 text-sm text-white outline outline-2 outline-white/30 hover:outline-white/30'>
                  <Text className='mr-2 w-5'/>
                  AI Auto-completion
              </Button>
              <Button className='rounded-3xl hover:outline-white/30 flex flex-row justify-center items-center pb-2 text-sm text-white outline outline-2 outline-white/30'>
                <Users className='mr-2 w-5'/>
                Real-Time Collaboration
              </Button>
              <Button className='rounded-3xl hover:outline-white/30 flex flex-row justify-center items-center pb-2 text-sm text-white outline outline-2 outline-white/30'>
                <FolderSearch className='mr-2 w-5'/>
                Secure and Dynamic Workspace
              </Button>
              <Button className='rounded-3xl hover:outline-white/30 flex flex-row justify-center items-center pb-2 text-sm text-white outline outline-2 outline-white/30'>
                  <Bot className='mr-2 w-5'/>
                  AI Multi-Lingual Summarization
              </Button>
              <Button className='rounded-3xl hover:outline-white/30 flex flex-row justify-center items-center pb-2 text-sm text-white outline outline-2 outline-white/30'>
                <ScrollText className='mr-2 w-5'/>
                Rich Text Editor
              </Button>
              <Button className='rounded-3xl hover:outline-white/30 flex flex-row justify-center items-center pb-2 text-sm text-white outline outline-2 outline-white/30'>
                  <MousePointer2 className='mr-2 w-5'/>
                  Live Cursor and Selection
              </Button>
          </section>
          <section className='flex justify-center items-center'>
            <div className=''>
            <Image width={1000} priority={true} src={poster} alt="Application Banner"/>
            </div>
          </section>
        </section>   
        <section className='flex sm:text-center sm:items-center flex-col gap-4'>
            <h1 className='text-white text-lg max-w-4xl'>"Cypress has been a game-changer for us. Our productivity and collaboration have improved significantly, leading to better software."</h1>
            <div className='flex sm:flex-col items-center gap-4'>
            <img src="https://avatars.githubusercontent.com/u/89721628?v=4" className='w-14 h-14 rounded-full border-2 border-white' />
            <Link href={'https://www.linkedin.com/in/aaditya-srivastava-b4564821b/'}>
              <Button className='rounded-3xl flex flex-row justify-center items-center pb-2 text-sm text-white outline outline-2 outline-white/30'>
                Aaditya Srivastava
              </Button>
            </Link>
            </div>
        </section>
      </section>
      <div className='flex px-4 pt-1 bg-white/20 text-white justify-between gap-4 flex-row items-center text-primary h-14 absolute bottom-0 w-full'>
        <h2 className='text-white'>© 2023 Context.AI</h2>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <Link href={'https://github.com/sumionochi'}>
            <Github/>
          </Link>
          <Link href={'https://www.linkedin.com/in/aaditya-srivastava-b4564821b/'}>
            <Linkedin/>
          </Link>
          <Link href={'mailto:aaditya.srivastava.connect@gmail.com'}>
            <Mail/>
          </Link>
          <Link href={'https://sumionochi.github.io/Portfolio-landing-page/'}>
            <ArrowUpRight/>
          </Link>
        </div>
      </div>
    </div>
  );
}