import React from 'react'
import comLogo from "../assets/community.png"
import { Link } from 'react-router-dom'
const CommunityLogo = () => {
  return (
    <div className='flex justify-center p-1 mb-2 '> <Link to='/' className=' w-80 px-2 py-1 shadow-sm shadow-cyan-500 bg-slate-50 flex mt-2 items-center justify-between gap-2'>
    <h2 className='text-purple-600 text-2xl capitalize font-medium'> Community Media App</h2>
    <img src={comLogo} className='border rounded-full shadow p-1 h-9 w-9' />
  </Link></div>
  )
}

export default CommunityLogo