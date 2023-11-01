import React from 'react'
import { Link} from "react-router-dom";
import { Form ,Button} from "react-bootstrap";
import { useState } from 'react';
import axios from "axios";
import { BASE_URL } from "./helper";
import { useNavigate } from "react-router-dom";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
function Forgotpassword() {
    const navigate=useNavigate();
    const [flag,setflag]=useState(true);
    const [flag1,setflag1]=useState(false);
    const [flag2,setflag2]=useState(false);
    const [flag3,setflag3]=useState(false);
    const [log,setlog]=useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [flag5,setflag5]=useState(false);
    const [user,SetUser]=useState({
        password:"",
        email:"",
        otp:"",
        cpassword:""
    });
    const handleSubmit = async (e) => {
        e.preventDefault()
        setflag5(false);
        setlog("");
          const {name,value}=e.target
          SetUser ({
              ...user,
              [name]:value
          })
        };
        const handleToggle = () => {
          if (type==='password'){
             setIcon(eye);
             setType('text')
          } else {
             setIcon(eyeOff)
             setType('password')
          }
       } 
    const fun1 = async(e) =>{
        e.preventDefault();
        const {email}=user;
        setlog("");
        if(email) {
            setflag1(true);
            axios.post(BASE_URL + "/passwordmail",user).then(res=>{
              
              if(res.data==="OTP SENT Succesfully"){
                setflag(false)
                setflag1(false);
              }
              else {
                setflag1(false);
                setlog("User Not Found")
              }
            });
        }
        else {
          setlog("Invalid Email")
        }
    }

    const verifyotp=async(e)=>{
        e.preventDefault();
        const {email,otp}=user;
        if(otp!=="" && email!=="") {
          setflag5(true);
            axios.post(BASE_URL + "/resetpassword",user).then(res=>{
                setlog("Invalid OTP")
                if(res.data==="Verified"){
                  setflag(false)
                  setflag1(false);
                  setflag2(true);
                }
                else {
                  setflag1(false);
                }
              });
        }else {
          setlog("Invalid OTP")
          setflag5("false");
        }
    }
    function cancel(){
        window.location.reload();
      }

    const updatenew=async(e)=>{
        e.preventDefault();
        const {email,password,cpassword}=user;
        if(!email || cpassword!==password || password.length<6) {
            alert("password didn't match/ Invalid");
        }
        else {
            setflag3(true);
            axios.post(BASE_URL + "/updatepassword",user).then(res=>{
                setflag3(true);
                alert(res.data);
                if(res.data==="SuccessFully Updated"){
                  navigate("/");
                }
                else {
                    setflag(false)
                    setflag1(false);
                    setflag2(true);
                    setflag3(false);
                }
              });
        }
    }
  return (
    <>
     {flag && !flag2 && <div class="d-flex justify-content-center align-items-center h-100 m-5 pp">
      <div className='m-5'>
        <h1>Reset Your Password</h1>
        <h4 className='p-2 m-1'>Enter Your Registered EmailID</h4>
        {flag1 && <h5 className="text-success ms-5 px-5">Sending OTP...</h5>}
        {!flag1 && log!=="" && <h5 className="text-danger ms-5 px-5">{log}</h5>}
        <Form onSubmit={fun1}>
            <Form.Group className="mt-5" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                placeholder="Email address"
                onChange={handleSubmit}
              />
            </Form.Group>
            <div className="d-grid mt-4">
              <Button variant="primary" type="Submit">
                Send OTP
              </Button>
            </div>
        </Form>
      </div>
    </div>}
    {!flag && !flag2 && <div className='border border-dark ppp pp p-5'>
            <h2 className="mb-3">Verify Your OTP Sent to</h2>
            <h6>{user.email}</h6>
            {flag1 && <h5 className="text-success">Sending OTP...</h5>}
            {flag5 && log==="" && <h5 className="text-success">Verifying OTP...</h5>}
            {!flag1 && log!=="" && <h5 className="text-danger ms-5 px-5">{log}</h5>}
             <Form >
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
              <Button variant="primary" type="Submit" onClick={verifyotp}>
                Verify OTP
              </Button>
            </div>
             </Form>
             <div className="p-2"><Link variant="primary" type="Submit" onClick={fun1} >
                Resend OTP ? 
              </Link></div>
             <div className="p-2"><Button variant="primary" type="Submit" onClick={cancel}>
                Cancel
              </Button></div>
          </div>}
          {flag2 && <div className='border border-dark ppp pp p-5'>
            <h1>Enter New Password</h1>
            {flag3 && <h5 className="text-success">Updating Password...</h5>}
            <Form onSubmit={updatenew}>
            <Form.Group className="mt-5" controlId="formBasicPassword">
                <Form.Control
                type={type}
                name="password"
                value={user.password}
                placeholder="New Password"
                onChange={handleSubmit}/>
                </Form.Group>
            <Form.Group className="mt-5" controlId="formBasicPassword">
                <Form.Control
                type={type}
                name="cpassword"
                value={user.cpassword}
                placeholder="Confirm Password"
                onChange={handleSubmit}/>
                <span onClick={handleToggle}>
                  <Icon icon={icon} size={20}/>
              </span>
                </Form.Group>
                <div className="d-grid mt-4">
              <Button variant="primary" type="Submit">
                Reset
              </Button>
            </div>
            </Form>
            <div className="p-2"><Button variant="primary" type="Submit" onClick={cancel}>
                Cancel
              </Button></div>
          </div> 

          }
    </>
  )
}

export default Forgotpassword