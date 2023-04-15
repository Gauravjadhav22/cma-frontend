import React, { useContext } from 'react'
import { BiLogOutCircle, BiAddToQueue } from 'react-icons/bi'
import comLogo from "../assets/community.png"
import boyLogo from "../assets/boy.png"
import CommunityLogo from '../components/CommunityLogo'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ChannelContext from '../context/ChannelProvider'
import useLogout from '../hooks/useLogout'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
const Nav = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const logout = useLogout()
    const { auth } = useContext(AuthContext)


    const { channels } = useContext(ChannelContext)
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className='-mt-4 flex mb-2 justify-end items-center'>
            <div className='flex flex-col items-center'>
                <div onClick={() => {
                    navigate({
                        pathname: '/profile',
                        search: `?user=${auth?.user?.username}`,
                    });
                }} className='shadow bg-slate-100 rounded-full border-1 cursor-pointer mt-8 ml-2 flex flex-col items-center'>
                    <img src={boyLogo} className=' h-10 w-10 p-0.5' />

                    <p
                        // to='/profile'

                        className={classNames(
                            '-mt-3 text-gray-700 block px-4 py-2 text-xs  hover:text-blue-800'
                        )}
                    >
                        Profile
                    </p>
                </div>
                <Menu as="div" className="mt-2 shadow self-end mr-8 relative inline-block text-left">

                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            More
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className=" m-2 absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">


                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="submit"
                                        onClick={() => logout()}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-red-800 ' : 'text-gray-700',
                                            'w-full px-4 py-2 text-left text-sm flex '
                                        )}
                                    >
                                        Sign out
                                        <BiLogOutCircle className='text-2xl' />
                                    </button>
                                )}
                            </Menu.Item>


                            <div className="py-1">


                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to='/join'

                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
                                                ' px-4 py-2 cursor-pointer text-sm gap-1 flex items-center hover:text-blue-800'
                                            )}
                                        >
                                            Join New Community<BiAddToQueue className='text-xl' />
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            // to='/profile'

                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
                                                ' px-4 py-2 text-sm gap-1 flex items-center hover:text-blue-800'
                                            )}
                                        >
                                            Create New Channel<BiAddToQueue className='text-xl' />
                                        </Link>
                                    )}
                                </Menu.Item>

                                {
                                    channels?.map((itm) => {
                                        return (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to=''
                                                        className={classNames(
                                                            active ? ' hover:text-blue-800 bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {itm?.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        )
                                    })
                                }



                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}

export default Nav