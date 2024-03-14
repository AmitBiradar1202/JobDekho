import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast"

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  
  if(!isAuthorized){
    navigateTo("/login")
  }



  useEffect(async()=>{
    try{
        const Jobsdata=await axios.get("http://localhost:4000/api/v1/job/getall",{withCredentials:true},)
        setJobs(Jobsdata.data)
    }
    catch(error){
      toast.error(Jobsdata.message)
    }
  },[])  


  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );

};

export default Jobs;