import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth";
import { login,logout, setLoading } from "./store/authSlice";
import {Header,Footer} from "./components/index"
import {Outlet} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setLoading(true));
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
    })
    .finally(()=>{
      dispatch(setLoading(false));
    })
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-blue-400">
      <Header/>
      <main className="flex-1">
        <Outlet className='w-auto'/>
      </main>
      <Footer/>
    </div>
  )
}

export default App