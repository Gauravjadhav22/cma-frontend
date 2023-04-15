import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NotFound from './components/NotFound';
import Channel from './components/Channel';
import RequireAuth from './components/RequireAuth';
import AuthContext from './context/AuthProvider';
import { useContext, useEffect } from 'react';
import Profile from './pages/Profile';
import CommunityLogo from './components/CommunityLogo';
import jwtDecode from 'jwt-decode';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Feed from './pages/Feed';
import JoinCommunity from './components/JoinCommunity';
import CreateChannel from './components/CreateChannel';
import useLogout from './hooks/useLogout';
function App() {
  const { setAuth, auth } = useContext(AuthContext)
  const logout = useLogout()
  useEffect(() => {
    const token = localStorage.getItem("token") || null
    if (!token || token === undefined) {
       logout()
    }
    const decoded = token && jwtDecode(token)

    console.log(decoded);
    setAuth({ ...decoded, accessToken: token })

    return () => {

    }
  }, [])


  return (
    <>
      <CommunityLogo />
    { auth?.user?.username && <Nav/>}
      <Routes>


        <Route path='*' element={<NotFound />} />
        <Route element={<RequireAuth />}>
          <Route path='/' element={< Dashboard />} />

        </Route>
        <Route element={<RequireAuth />}>
          <Route path='/join' element={< JoinCommunity />} />

        </Route>
        <Route element={<RequireAuth />}>
          <Route path='/create' element={< CreateChannel />} />

        </Route>

        <Route element={<RequireAuth />}>
          <Route path='/feed' element={<Feed />} />


        </Route>
        <Route element={<RequireAuth />}>
          <Route path='/profile' element={<Profile />} />


        </Route>
        {/* <Route element={<RequireAuth />}>

          <Route path='/chat' element={<GroupChat />} />
        </Route> */}

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<SignIn />} />


      </Routes>
      <Footer/>
    </>
  );
}

export default App;
