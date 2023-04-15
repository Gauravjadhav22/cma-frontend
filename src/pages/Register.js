import axios from '../config/Api';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IsLoading from '../components/IsLoading';
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const Passwd_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const GMAIL_REGEX = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;


const Register = () => {


    const userNameRef = useRef();
    const errRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserNameFocus] = useState(false);

    const [passwd, setPasswd] = useState("");
    const [validPasswd, setValidPasswd] = useState(false);
    const [PasswdFocus, setPasswdFocus] = useState(false);

    const [matchPasswd, setMatchPasswd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    const [gmail, setGmail] = useState("");
    const [validGmail, setValidGmail] = useState(false);
    const [gmailFocus, setGmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    // useEffect(() => {
    //     setValidName(USER_REGEX.test(userName));
    // }, [userName]);
    useEffect(() => {
        setValidGmail(GMAIL_REGEX.test(gmail));
    }, [gmail]);

    useEffect(() => {
        setValidPasswd(Passwd_REGEX.test(passwd));
        setValidMatch(passwd === matchPasswd);
    }, [passwd, matchPasswd]);

    useEffect(() => {
        setErrMsg("");
    }, [userName, passwd, matchPasswd]);

    const handleSubmit = async (e) => {
        // setIsLoading(true)

        e.preventDefault();
        // if button enabled with JS hack
        // const v1 = USER_REGEX.test(userName);
        // const v2 = Passwd_REGEX.test(passwd);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        if (passwd !== matchPasswd) {
            setErrMsg("password do not match!..");
            return;
        }
        try {

            await axios.post(
                '/register',
                JSON.stringify({
                    username: userName,
                    passwd,
                    fullname: fullName,
                    gmail: gmail && gmail
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );



            setSuccess(true);
            setUserName("");
            setPasswd("");
            setGmail("");
            setMatchPasswd("");
            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)

            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg(`Username or gmail Taken......... Choose Another One`);
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };


    return (
        <div>
            <div className="flex flex-col items-center max-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">


                {success ? (
                    <section className=' text-center mb-4 text-xl flex flex-col justify-center items-center '>
                        <h1 className='mb-12' >Success!</h1>
                        <p>
                            <a href="/login" className='hover:bg-blue-600 p-2 my-10 rounded-xl text-white text-center'>Sign In</a>
                        </p>
                    </section>
                ) : isLoading ? <IsLoading /> : (
                    <>
                        <div className='flex justify-center items-center mb-2 mt-4 text-xl text-red-600'>

                            <p
                                ref={errRef}
                                className={errMsg ? "errmsg" : "invisible"}
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                        </div>

                        <div className="border-2 w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                            <h1 className='text-xl text-purple-600 text-center font-bold'>Sign Up </h1>

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 undefined"
                                    >
                                        Name
                                    </label>
                                    <div className="flex flex-col items-start border rounded-md">
                                        <input
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            type="text"
                                            name="name"
                                            className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 " >
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 undefined"
                                    >
                                        Email
                                    </label>
                                    <div className="flex flex-col items-start border rounded-md">
                                        <input
                                            required
                                            value={gmail}
                                            onChange={(e) => setGmail(e.target.value)}
                                            type="email"
                                            name="email"
                                            className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onFocus={() => setGmailFocus(true)}
                                            onBlur={() => setGmailFocus(false)} />
                                    </div>
                                    {/* <p
                                        className={`flex text-xs ${userFocus && userName && !validName ? "visible" : "invisible"
                                            } text-white`}
                                    >

                                        &nbsp;
                                        4 to 24 characters.
                                        Must begin with a letter.
                                        <br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p> */}
                                </div>
                                <div className="mt-4 " >
                                    <label
                                        htmlFor="userName"
                                        className="block text-sm font-medium text-gray-700 undefined"
                                    >
                                        UserName
                                    </label>
                                    <div className="flex flex-col items-start border rounded-md">
                                        <input
                                            required
                                            type="text"
                                            ref={userNameRef}
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            name="username"
                                            className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onFocus={() => setUserNameFocus(true)}
                                            onBlur={() => setUserNameFocus(false)}
                                        />

                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 undefined"
                                    >
                                        Password
                                    </label>
                                    <div className="flex flex-col items-start border rounded-md">
                                        <input
                                            required
                                            onChange={(e) => setPasswd(e.target.value)}
                                            type="password"
                                            name="password"
                                            className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-700 undefined"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="flex flex-col items-start border rounded-md">


                                        <input
                                            required
                                            onChange={(e) => setMatchPasswd(e.target.value)}
                                            type="password"
                                            name="password_confirmation"
                                            className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        className="text-sm text-gray-600 underline hover:text-gray-900"
                                        to='/login'
                                    >
                                        Already registered?
                                    </Link>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>)}

            </div>
        </div>
    )
}

export default Register