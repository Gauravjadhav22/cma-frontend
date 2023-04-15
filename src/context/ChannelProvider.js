import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./AuthProvider";
import useLogout from "../hooks/useLogout";
import jwtDecode from "jwt-decode";
import axios from "axios";

const ChannelContext = createContext({})

export const ChannelProvider = ({ children }) => {
    const logout = useLogout()
    const { auth, setAuth } = useContext(AuthContext)
    // const [auth, setAuth] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem("token") || null
        if (!token || token === undefined) {
            logout()
        }
        const decoded = token && jwtDecode(token)
        // console.log(decoded.user.userId);
        getCommunity(decoded.user.userId,token)
        setAuth({ ...decoded, accessToken: token })

        return () => {

        }
    }, [])

    const axiosPrivate = useAxiosPrivate()
    const [posts, setPosts] = useState(null)
    const [community, setCommunity] = useState(null)

    const [channels, setChannels] = useState(null)
    const [users, setUsers] = useState(null)

    const getCommunity = async (tkn,id) => {
        console.log(auth?.user?.userId);

        try {
            const response = await axios.get(`http://localhost:5050/api/communities/user/64326f645a6837a354dc28cd`,{
                headers: {'Authorization': `Bearer ${tkn}`}
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }
    const getChannels = async (id) => {


        try {
            const response = await axiosPrivate.get('/api/channels/com/' + community.id)
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }
    const getPosts = async () => {


        try {
            const response = await axiosPrivate.get('/api/posts/channel/' + channels[0].id)
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }




    return (
        <ChannelContext.Provider value={{ getChannels, getPosts, getCommunity, posts, users, setPosts, channels, setChannels, setUsers }}>

            {children}
        </ChannelContext.Provider>
    )





}

export default ChannelContext