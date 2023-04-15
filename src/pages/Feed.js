import React, { useContext, useRef, useState } from 'react'
import { AiOutlineFileAdd, AiFillLike, AiOutlineSend, AiOutlineLike, AiTwotoneDislike, AiOutlineDislike } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import fileLogo from "../assets/folder.png"
import { BiCommentDetail, BiPencil, BiSend } from 'react-icons/bi'
import AuthContext from '../context/AuthProvider'
import { Link } from 'react-router-dom'
const Feed = () => {
    const likeDislike = useRef({
        liked: false,
        disliked: false
    })
    const [uploadImage, setUploadImage] = useState(null)
    const [updatebox, setUpdatebox] = useState(false)
    const [updateId, setUpdateId] = useState("")
    const [newContent, setNewContent] = useState("")

    const [updateCmt, setUpdateCmt] = useState([])
    const [cmtCount, setCmtCount] = useState([])
    const [comment, setComment] = useState("")
    const { auth } = useContext(AuthContext)
    const item = { user: "fkslfs", }

    return (
        <div className='bg-gray-50 min-h-screen flex-col justify-between items-center'>
            <div className='flex flex-col items-center '>
                <div key={item._id} className={` p-2 flex flex-col items-stretch  text-center my-8 bg-gray-100 transition rounded-xl shadow-gray-500 shadow w-96`} >
                    <div className=' w-full bg-amber-100 flex justify-around items-center flex-wrap px-2'>
                        {item.user === auth?.user?.userId &&
                            <div className="m-3 w-fit text-left text-white rounded-xl flex justify-start items-center">
                                <BiPencil onClick={() => {
                                    setUpdateId(item._id)
                                    setUpdatebox(true)
                                }} className="text-2xl cursor-pointer text-black mr-5" />
                                {/* <RiDeleteBin6Line onClick={() => deleteBlog(item._id)} className="text-2xl cursor-pointer text-white bg-black" /> */}
                            </div>}
                        {/* <Link to="/finduser" exact className='font-bold text-lg break-words flex-1 hover:underline cursor-pointer' onClick={() => setFoundUserName(item.user.username)}>@{item.user.username}</Link> */}
                        <div className='font-bold text-sm ml-8'>{item.createdAt}</div>

                    </div>


                    <div className='p-4 flex flex-col justify-center text-left w-full bg-slate-300-100 '>


                        <br />
                        {/* content */}
                        <div className='text-left text-xl mb-4 font-bold break-words border-2 border-gray-200 p-2 border-none'>" {item.content} "</div>

                        {/* pictures */}
                        <div className='flex flex-wrap justify-center items-center p-4 border-none' >
                            {item?.pictures?.map(item => {
                                return <img key={item._id + Math.random(Math.floor(9) * 100)} src={item} className=' hover:scale-125  transition w-52 h-52 m-1' />
                            })}

                        </div>
                        <br />
                    </div>

                    {/* like and dislike */}
                    <div className="flex justify-center items-center">
                        <div className='flex text-left justify-between mb-4'>
                            <div
                                onClick={() => {
                                    likeDislike.current = { liked: true, disliked: false }
                                    // setLikedAndDisliked(likeDislike, item._id)
                                }}
                                className='text-4xs mx-4 flex justify-center items-center'><h1 className="text-green-600 text-2xl font-bold">{item?.liked?.length}</h1>
                                {item?.liked?.find((itm) => itm === auth?.user?.userId) ? <div className=" hover:animate-pulse transition delay-700 p-2 "> <AiFillLike className=' text-4xl' /></div> : <div className=" hover:animate-pulse transition delay-700  p-2 "><AiOutlineLike className=' text-4xl' /></div>}
                            </div>
                            <div
                                onClick={() => {
                                    likeDislike.current = { liked: false, disliked: true }

                                    // setLikedAndDisliked(likeDislike, item._id)
                                }}

                                className='text-4xs mx-4  flex justify-center items-center'><h1 className="text-red-600 text-2xl font-bold">{item?.disliked?.length}</h1>
                                {item?.disliked?.find((itm) => itm === auth?.user?.userId) ? (
                                    <div className="hover:animate-pulse transition delay-700 p-2 "><AiTwotoneDislike className='text-4xl' /></div>) : (<div className="hover:animate-pulse transition delay-700 p-2"> <AiOutlineDislike className=' text-4xl' /></div>)}
                            </div>
                            <div className='text-xs mx-4 flex justify-center items-center'><h1 className="text-blue-600 font-bold text-2xl">{(() => {

                                var obj = cmtCount.find((i) => i[item._id])
                                return obj && Object.values(obj)[0]

                            })()}</h1><BiCommentDetail className='text-4xl' /></div>
                        </div>
                    </div>

                    {/* comments */}
                    <div className="flex justify-center">
                        <div className='px-32 p-4 pb-0 xl:w-128 lg:w-128 md:w-96 sm:w-72 h-96 flex flex-col justify-end items-center '>
                            <div className='overflow-y-scroll scrollbar-hide mb-1 xl:w-128 lg:w-128 md:w-96 sm:w-80   '>



                                {/* <Comments cmtCount={cmtCount} setCmtCount={setCmtCount} update={updateCmt} cmt={comment} setUpdate={setUpdateCmt} key={item._id} id={item._id} /> */}



                            </div>
                            {/* {auth?.accessToken && */}
                            <div className='shadow-gray-700 mb-4 flex items-center shadow xl:w-96 lg:w-92 md:w-80 sm:w-72 justify-center '>
                                <input value={comment} onChange={(e) => setComment(e.target.value)} type='text' placeholder='wow! Amazing Stuff' className='xl:w-144 lg:w-128 md:w-96 sm:w-64 p-0 shadow-lg h-12 rounded-full text-center'
                                // onKeyDown={(e) => e.key === 'Enter' && 
                                // addComment(item._id)}
                                /> <BiSend style={{ fontSize: "60px" }} className='text-6xl text-blue-600 ml-2 rounded-full' onClick={() => {
                                    // addComment(item._id)}
                                    console.log("jfsd");
                                }} />
                            </div>
                            {/* } */}
                        </div>
                    </div>
                </div>

            </div>
            <div className=''>
                <form className='flex items-center p-2 justify-center'>
                    <div className='flex justify-center shadow items-center border mr-3 '>


                        <textarea onChange={(e) => uploadImage(e.target.files)} className='' multiple />



                        <label>
                            <img src={fileLogo} className='h-14' />

                            <input onChange={(e) => uploadImage(e.target.files)} type='file' className='hidden' multiple />


                        </label>


                    </div>
                    <button type='submit'><AiOutlineSend className='text-4xl text-blue-800' /></button>

                </form>
            </div>
        </div>
    )
}

export default Feed