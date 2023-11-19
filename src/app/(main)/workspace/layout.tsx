import NavHeader from '@/components/NavHeader'
import React from 'react'

interface Props {
    children:React.ReactNode;
    params: any;
}

const Layout: React.FC<Props> = ({children, params}) => {
  return (
    <main className='flex overflow-hidden min-h-screen'>
      {children}
    </main>
  )
}

export default Layout