import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import axios from "../config/Api"
import IsLoading from '../components/IsLoading';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {

  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate()

  const [userName, setUserName] = useState("");
  const [passwd, setpasswd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, passwd]);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      let obj = {
      }
      if (userName.includes('@')) {
        obj = { gmail: userName, passwd }
      }
      if (!userName.includes('@')) {
        obj = { username:userName, passwd }
      }
      const response = await axios.post(
        '/auth',
        JSON.stringify(obj),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      const accessToken = response?.data?.accessToken;
      localStorage.setItem("token", accessToken)
      setAuth({ accessToken, user: { userId: response.data._id, username: response.data.username, gmail: response.data.gmail, fullname: response.data.fullname } });



      setUserName('');
      setpasswd('');
      navigate('/')
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };


  return (
    <div>

      {
        isLoading ? (<IsLoading />) : (
          <div className=" relative flex flex-col justify-center items-center max-h-screen overflow-hidden">
            <p
              ref={errRef}
              className={`text-center mt-14 text-red-600 text-2xl ${errMsg ? "visible" : "invisible"}`}
              aria-live="assertive"
            >
              {errMsg}
            </p>


            <div className="border-2 shadow-lg mx-2 w-full p-6 m-auto bg-white rounded-md lg:max-w-xl">

              <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                Sign in
              </h1>
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email/Username
                  </label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    ref={userRef}
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
                    onChange={(e) => setpasswd(e.target.value)}
                    type="password"
                    required
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <a
                  href="#"
                  className="text-xs text-purple-600 hover:underline"
                >
                  Forget Password?
                </a>
                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                Don't have an account?{" "}
                <Link
                  to='/register'
                  className="font-medium text-purple-600 hover:underline text-xl"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        )}

    </div>
  )
}

export default SignIn