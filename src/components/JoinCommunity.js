import React, { useContext, useEffect, useRef, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const JoinCommunity = () => {

    const errRef = useRef();
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const [id, setId] = useState("");
    const [create, setCreate] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [idAndPass, setIdAndPass] = useState(null)
    const axiosPrivate = useAxiosPrivate()
    // useEffect(() => {
    //   userRef.current.focus();
    // }, []);

    useEffect(() => {
        setErrMsg("");
    }, [id, password, name, idAndPass]);

    const handleJoinSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {

            const response = await axiosPrivate.patch(
                '/api/communities/' + id,
                JSON.stringify({ password, users: [auth?.user?.userId] }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(response);




            setId('');
            setPassword('');
            // navigate('/')
            setIsLoading(false)
        } catch (err) {
            console.log(err);
            setIsLoading(false)
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing name or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed");
            }
            errRef.current.focus();
        }
    };
    const handleCreateSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {

            const response = await axiosPrivate.post(
                '/api/communities/',
                JSON.stringify({ name, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            console.log(response);

            setIdAndPass({ id: response.data.community.id, password: response.data.community.password })
            setName('');
            setPassword('');
            setIsLoading(false)
        } catch (err) {
            console.log(err);
            setIsLoading(false)
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing name or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed");
            }
            errRef.current.focus();
        }
    };


    return (
        <div>     <div className=" relative flex flex-col justify-center items-center max-h-screen overflow-hidden">
            <p
                ref={errRef}
                className={`text-center mt-14 text-red-600 text-2xl ${errMsg ? "visible" : "invisible"}`}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <p
                
                className={`text-center mt-14 text-blue-600 text-2xl ${idAndPass ? "visible" : "invisible"}`}
                aria-live="assertive"
            >
                id--&gt;{idAndPass?.id}
                <br/>
                pass--&gt;{idAndPass?.password}
            </p>


            <div className="border-2 shadow-lg mx-2 w-full p-6 m-auto bg-white rounded-md lg:max-w-xl">



                {!create ? (
                    <>
                        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                            Join New Community
                        </h1>
                        <form onSubmit={handleJoinSubmit} className="mt-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Id
                                </label>
                                <input
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}

                                    type="text"
                                    required
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>

                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>

                            <div className="mt-6">
                                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    Join
                                </button>
                            </div>
                        </form>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            {" "}
                            <p
                                onClick={() => setCreate(true)}
                                className="font-medium text-purple-600 hover:underline text-xl"
                            >
                                Create New Community
                            </p>
                        </p></>
                ) : (
                    <>
                        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                            Create New Community
                        </h1>
                        <form onSubmit={handleCreateSubmit} className="mt-6">


                            <div className="mb-2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    name
                                </label>

                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    required
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>

                                <input
                                    value={password}

                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>


                            <div className="mt-6">
                                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    Create
                                </button>
                            </div>
                        </form>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            {" "}
                            <p
                                onClick={() => setCreate(false)}
                                className="font-medium text-purple-600 hover:underline text-xl"
                            >
                                Join New Community
                            </p>
                        </p></>
                )}



            </div>
        </div></div>
    )
}

export default JoinCommunity