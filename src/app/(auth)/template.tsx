import React from 'react'

interface Props {
    children: React.ReactNode
}

const Template: React.FC<Props>=({children}) => {
  return (
    <div className='min-h-screen p-4 flex justify-center items-center'>{children}</div>
  )
}

export default Template