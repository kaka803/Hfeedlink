import React from 'react'
import { RiseLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <RiseLoader color='rgb(147, 51, 234)' />
    </div>
  )
}

export default Loader

