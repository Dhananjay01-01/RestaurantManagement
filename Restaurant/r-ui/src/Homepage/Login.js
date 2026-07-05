import React, { useContext, useState } from 'react'
import "../Styles/Login.css"
import { Usercontext } from '../Usercontext';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const {setuser} = useContext(Usercontext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
      e.preventDefault();
    
      if (email === "" || password === "") {
        toast.error("Please fill in both email and password", { theme: "colored" });
        return;
      }
    
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to login");
          return;
        }
    
        const userData = await response.json();
    
        if (email === "restaurant@gmail.com") {
          navigate("/restaurantmain");
        } else {
          navigate("/usermain");
        }
    
        setuser(userData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to login");
      }
    };
    
    return (
        <>
        <div className='vh'>
            <form className='card w-25 h-50 mx-auto my-auto p-3 some' onSubmit={handleLogin}>
                <h1 className='mx-auto'>Login</h1>
                <input className='form-control mb-4' type="text" placeholder="E-mail" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                    <input className='form-control mb-4' type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                    <button className='btn btn-dark ' onClick={handleLogin}>Login</button>
            </form>
            </div>
        </>
            )
}
