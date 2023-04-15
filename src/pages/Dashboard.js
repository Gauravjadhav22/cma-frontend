import React, { useContext, useEffect } from 'react'

import { Link, useSearchParams } from 'react-router-dom'
import ChannelContext from '../context/ChannelProvider'
import useLogout from '../hooks/useLogout'
import comLogo from "../assets/community.png"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import Channel from '../components/Channel'
const Dashboard = () => {
  const { auth } = useContext(AuthContext)


  const { channels,getChannels,getPosts,getCommunity, } = useContext(ChannelContext)

  useEffect(() => {
    
  getCommunity()
    return () => {
      
    }
  }, [])
  
  return (
    <div className='flex flex-col justify-center items-center'>



      <h1 className='text-xl mb-4 font-medium bg-amber-100 px-2 rounded-sm shadow'>channel name..</h1>
      {/* //channels */}

      <div class="flex lg:flex-row xl:flex-row md:flex-row sm:flex-col gap-1 p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-700 w-full min-h-screen">
        <div className='overflow-y-scroll max-h-screen pr-2'>
          <ul class="mt-3 divide-y divider-gray-100 dark:divide-gray-700">
            <li className='my-4 p-1 bg-gray-500 rounded-sm'>
              <Link class="items-center block  sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">

                <img class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0" src={comLogo} alt="img" />
                <div class="text-gray-900 dark:text-gray-400">
                  <div class="font-normal text-white text-xl text-center">Feed</div>
                  <div class="text-sm font-normal flex justify-between items-center gap-2 text-black">"I wanted to share a webinar zeroheight."
                    <time class="text-lg font-semibold text-gray-600 dark:text-white self-end"> January 13th, 2022</time>

                  </div>

                </div>

              </Link>
            </li>
           
            <li className='my-4 p-1 bg-gray-500 rounded-sm'>
              <Link class="items-center block  sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">

                <img class="w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0" src={comLogo} alt="img" />
                <div class="text-gray-900 dark:text-gray-400">
                  <div class="font-normal text-white text-xl text-center">Feed</div>
                  <div class="text-sm font-normal flex justify-between items-center gap-2 text-black">"I wanted to share a webinar zeroheight."
                    <time class="text-lg font-semibold text-gray-600 dark:text-white self-end"> January 13th, 2022</time>

                  </div>

                </div>

              </Link>
            </li>
           
            
        

          </ul>
        </div>
        <Channel />


      </div>

    </div>
  )
}

export default Dashboard