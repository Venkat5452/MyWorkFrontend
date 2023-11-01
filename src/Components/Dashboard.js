import React, { useState } from 'react'
import image from './Images/loginicon.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {useEffect} from 'react';
function Dashboard() {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const handlelogout=()=>{
    console.log("hello ")
    localStorage.removeItem('token');
    localStorage.removeItem('token1');
    navigate('/');
  }
  useEffect(()=>{
    function f() {
      if(!localStorage.getItem('token')) {
        navigate("/login");  
    }
    else {
      setName(localStorage.getItem('token'));
    }
    }
      f();
  },);
  return (
    <>
    <div class="d-flex justify-content-center align-items-center h-100 m-5">
      <div className='m-5'>
        <Button className='border border-round bg-white' onClick={handlelogout}><img src={image} alt=''></img></Button>
        <h4 className='p-3'>Hello {name}</h4>
      </div>
    </div>
    </>
  )
}

export default Dashboard;