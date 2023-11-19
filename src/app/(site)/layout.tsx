import NavHeader from '@/components/NavHeader'
import React from 'react'

type Props = {}

const HomepageLayout = ({children}: {children:React.ReactNode}) => {
  return (
    <main>
      <NavHeader/>
      {children}
    </main>
  )
}

export default HomepageLayout