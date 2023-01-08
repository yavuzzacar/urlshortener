import logo from "./logo.svg";
import "./App.css";
import UrlShort from "./UrlShort";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context";
import { useState } from "react";
import Navbar from './Navbar';
import Charts from './Charts';
function App() {
  const [usermail, setUserMail]=useState();
  const [token, setToken]=useState();
  const data={
    usermail,setUserMail,token,setToken
  }


  
  return (
    <UserContext.Provider value={data}>
      <Navbar> </Navbar>
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shorten" element={<UrlShort />} />
        <Route path="/register" element={<Register />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </div>
 
    </UserContext.Provider>
  );
}

export default App;
