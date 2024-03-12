import React, { useContext, useEffect } from 'react'
import {Context} from "./main.jsx"
import Login from "./components/Auth/Login.jsx"
import Register from './components/Auth/Register.jsx'
import Navbar from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Home from './components/Home/Home.jsx'
import JobDetails from './components/Job/JobDetails.jsx'
import AllJobs from './components/Job/AllJobs.jsx'
import MyJobs from './components/Job/MyJobs.jsx'
import PostJob from './components/Job/PostJob.jsx'
import MyApplication from './components/Application/MyApplication.jsx'
import Application from './components/Application/Application.jsx'
import Errors from './components/NotFound/Errors.jsx'


import axios from "axios"
import {Toaster} from "react-hot-toast"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {

  const {Authorized,setAuthorized,setUser}=useContext(Context);
  useEffect(()=>{
      const fetchUser =async()=>{
        try{
          const fetchUser= await axios.get("",{withCredentials:true})
          setUser(response.data.user);
          setAuthorized(true);

        }
      
      catch(error){
          setAuthorized(false);
      }
      }
      fetchUser();
  },[Authorized]) //We have written Authorized beacuse authorizedd changes 
                  //fecthUser function Works
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<AllJobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplication />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<Errors />} />
        </Routes>
        <Footer/>
        <Toaster />
      </Router>
    </div>
  )
}

export default App
