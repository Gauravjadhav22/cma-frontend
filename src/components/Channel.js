import React from 'react'
import ChatBox from './ChatBox'

const Channel = () => {
  return (
    <div className='border-1 bg-gray-900 p-1 w-full min-h-screen'>
     
     <h1 className='text-center'> Channel</h1>

      <div>
        <ChatBox />
      </div>
    </div>
  )
}

export default Channel