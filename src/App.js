import React from "react";
import { Route,Routes } from "react-router-dom";
import DashBoard from './Components/Dashboard';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Forgotpassword from "./Components/Forgotpassword";
function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact path='/' element={
          <DashBoard/> 
        }/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Forgotpassword' element={<Forgotpassword/>}/>
       </Routes>
    </div>
  );
}

export default App;
