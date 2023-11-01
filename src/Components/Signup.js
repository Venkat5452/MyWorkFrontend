import image from './Images/img1.png';
import React, { useState } from "react";
import { Link,} from "react-router-dom";
import { Form} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./helper";
import './Signup.css';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
function Signup() {
  localStorage.removeItem('token');
  localStorage.removeItem('token1');
  const navigate=useNavigate();
    const [user,SetUser]=useState({
        name:"",
        email:"",
        password:"",
        otp:"",
        role:"",
        company:"",
        department:"",
        cpassword:""
    });
    const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
    const [flag,setflag]=useState(true);
    const [flag1,setflag1]=useState(false);
    const [log,setlog]=useState("");
    const handleSubmit = async (e) => {
      e.preventDefault()
      setlog("");
        const {name,value}=e.target
        SetUser ({
            ...user,
            [name]:value
        })
      };

      const signup2 =async (e) => {
        e.preventDefault();
          const {name,email,password,otp}=user;
          if(name && email && password && password.length>=6 && otp.length===6) {
             axios.post( BASE_URL + "/signup",user)
             .then(res => {
              if(res.data.message==="SuccessFully Registered") {
                alert(res.data.message);
                localStorage.setItem('token',name);
                localStorage.setItem('token1',email);
                navigate("/login")
              }
              else if(res.data==="Invalid OTP") {
                setlog("Invalid OTP")
              }
            })
          }
          else {
            setlog("Invalid OTP")
          }
      }
      const signup1 = async(e)=>{
        e.preventDefault(e);
        const {email,name,password,cpassword,company,role,department}=user;
        if(password!==cpassword) {
          setlog("Password didn't match")
        }
        else if(name && email && password && password.length>=6 && role && department && company) {
            setflag1(true);
            setlog("");
            axios.post(BASE_URL + "/makemail",user).then(res=>{
              if(res.data==="Email Already Registered") {
                setflag1(false);
                setlog("Email Already Registered");
              }
              if(res.data==="OTP SENT Succesfully"){
                setflag(false)
                setflag1(false);
              }
            });
        }
        else {
            setlog("Invalid Details")
        }
      }

      function cancel(){
        window.location.reload();
      }

      const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     } 
  return (
    <>
      { flag && <div class="container mx-auto m-5 pt-2 pp">
        <div class="row justify-content-center">
        <div class="col-5" style={{ width: "49%", height: "50%" }}>
                <div><img src={image} style={{ width: "100%" ,maxHeight:"100%"}} alt=""></img></div>
            </div>
            <div class="col-6 ms-2 mt-5 p-2">
            <h1 className="">Sign up</h1>
            {flag1 && <h5 className="text-success">Sending OTP...</h5>}
            {!flag1 && log!=="" && <h5 className="text-danger">{log}</h5>}
            <div>Have have an account? <Link to="/Login">Log in</Link></div>
            <Form  style={{ minWidth: "50%"}}>
            <div className="row">
            <div class='col-6'>
                <Form.Group className="mt-4" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                placeholder="Full Name*"
                onChange={handleSubmit}
              />
            </Form.Group>

                </div>
                <div class='col-6'>
                <Form.Group className="mt-4" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="company"
                value={user.company}
                placeholder="Company*"
                onChange={handleSubmit}
              />
            </Form.Group>
                </div>
            </div>
            <div className="row">
                <div class='col-6'>
                <Form.Group className="mt-4" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                placeholder="Email address*"
                onChange={handleSubmit}
              />
            </Form.Group>

                </div>
                <div class='col-6'>
                <Form.Group className="mt-4" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="role"
                value={user.role}
                placeholder="Role / title*"
                onChange={handleSubmit}
              />
            </Form.Group>

                </div>
            </div>
            <div className="row">
                <div class='col-6'>
                <Form.Group className="mt-4" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="department"
                value={user.department}
                placeholder="Department*"
                onChange={handleSubmit}
              />
            </Form.Group>

                </div>
                <div class='col-6'>
                <Form.Group className="mt-4" controlId="formBasicPassword">
                    <Form.Control
                type={type}
                name="password"
                value={user.password}
                placeholder="Password*(length > 5)"
                onChange={handleSubmit}
                />
                </Form.Group>
                </div>
            </div>
            <div class='row'>
                <Form.Group className="mt-4" controlId="formBasicEmail">
              <Form.Control
                type={type}
                name="cpassword"
                value={user.cpassword}
                placeholder="Confirm Password*"
                onChange={handleSubmit}
              />
            </Form.Group>
            <span onClick={handleToggle} className="ms-1">
                  <Icon icon={icon} size={20}/>
              </span>
                </div>
            <div className="d-grid mt-4">
              <Button variant="primary" type="Submit" onClick={signup1}>
                Sign Up
              </Button>
            </div>
            </Form>
            </div>
        </div>
    </div>}
          {!flag && <div className='border border-dark ppp pp p-5'>
            <h2 className="mb-3">Verify Your OTP Sent to</h2>
            <h6>{user.email}</h6>
            {flag1 && <h5 className="text-success">Sending OTP...</h5>}
            {!flag1 && log!=="" && <h5 className="text-danger">{log}</h5>}
             <Form onSubmit={signup2}>
             <Form.Group className="mb-3" controlId="formBasicOTP">
              <Form.Control
                type="password"
                placeholder="Enter OTP"
                name="otp"
                value={user.otp}
                minLength={'6'}
                onChange={handleSubmit}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="Submit" onClick={signup2}>
                Verify OTP
              </Button>
            </div>
             </Form>
             <div className="p-2"><Link variant="primary" type="Submit" onClick={signup1}>
                Resend OTP ? 
              </Link></div>
             <div className="p-2"><Button variant="primary" type="Submit" onClick={cancel}>
                Cancel
              </Button></div>
          </div>}
      </>
  )
}

export default Signup;