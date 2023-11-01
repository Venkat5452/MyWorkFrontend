import React, { useState } from "react";
import { Link} from "react-router-dom";
import { Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Login.css';
import axios from "axios";
import { BASE_URL } from "./helper";
import image from './Images/img1.png';

const Login=( )=> {
  localStorage.removeItem('token');
  localStorage.removeItem('token1');
  const navigate=useNavigate();
  const [log,setlog]=useState("");
  const [d,sd]=useState("1");
  const [user,SetUser]=useState({
      password:"",
      email:"",
      name:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    setlog("");
      const {name,value}=e.target
      SetUser ({
          ...user,
          [name]:value
      })
    };
    const login1=async(e)=>{
      e.preventDefault();
      const {email,password}=user
      if(email && password && password.length >=6) {
        sd("");
         axios.post( BASE_URL + "/login",user)
         .then(res => {
          if(res.data.message) {
            setlog(res.data.message);
          }
          sd(res.data.message);
          if(res.data.user) {localStorage.setItem('token',res.data.user.name);
          localStorage.setItem('token1',res.data.user.email);
          navigate("/");
         }
        })
      }
      else {
        setlog("qwe");
      }
    }
     return (
      <>
      <div class="container mx-auto m-5 pt-2 pp">
        <div class="row justify-content-center">
            <div class="col-5">
                <img src={image} alt=""></img>
            </div>
            <div class="col-5 ms-5 mt-5 p-2">
            <h1 className="">Login </h1>
            {d==="" && (<h6 className="text-success">Verifying user....</h6>)}
            {log!=="" && (<h6 className="text-danger">Invalid Email/Password....</h6>)}
            <div>Don't have an account? <Link to="/Signup">Sign up</Link></div>
            <Form onSubmit={login1}>
            <Form.Group className="mt-5" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                placeholder="Email address"
                onChange={handleSubmit}
              />
            </Form.Group>
  
            <Form.Group className="mt-5" controlId="formBasicPassword">

              <Form.Control
                type="password"
                name="password"
                value={user.password}
                placeholder="Password"
                onChange={handleSubmit}
              />
            </Form.Group>
            <div className="mt-3">
                <Link to="/forgotpassword">Forgot Password ? </Link>
            </div>
            <div className="d-grid mt-4">
              <Button variant="primary" type="Submit">
                Log In
              </Button>
            </div>
            </Form>
            </div>
        </div>
    </div>
      
      </>
    )
}

export default Login;