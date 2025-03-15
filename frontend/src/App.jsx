import React, { useEffect } from 'react'
import AuthForm from './components/Auth/Auth'
import { ToastContainer, toast } from 'react-toastify';
import { Outlet } from 'react-router-dom'
import axiosInstance from './axiosConfig/axiosConfig';
import Header from './components/Header/Header';
const App = () => {

  const fetchSessionId = async () => {
    const sessionId =  sessionStorage.getItem("sessionId");
    if (sessionId) {
      return
    }
    try {
      const response = await axiosInstance.get('/user/sessionid');
      if(response.data){
        console.log("session : " , response.data)
        sessionStorage.setItem("sessionId" , response.data.sessionId);
      }
    } catch (error) {
      console.log("error : " , error)
    }
  }

  useEffect(() => {
    fetchSessionId();
  }, [])


  return (
    <div className='min-h-screen w-full f '>
      <ToastContainer/>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App