import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const [gender, setgender] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [mobileNo, setmobileNo] = useState('');
    const [city, setcity] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const navigate = useNavigate();

    const handleregister = (e) => {
        e.preventDefault();
        if (name  === "" || email === "" || mobileNo === "" || city === "" || password === "" || cpassword === "" || gender === ''){
            alert("Please fill all details ")
        }else if(password !== cpassword){
            alert("Passwords must be same")
        }else{
            axios.post('http://localhost:8080/postuser', {
                    name: name,
                    email: email,
                    password: password,
                    gender: gender,
                    mobileNo: mobileNo,
                    city: city,
                    status:"Confirm"

            }).then(() => {
                alert(" Succesfully Registered")
                navigate("/login")
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <div className='vh now'>
            <form className='some w-50 card p-4' onSubmit={handleregister}>
                <h1 className='mx-auto'>Registration</h1>
                <input className='form-control mb-3' placeholder='Name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
                <input className='form-control mb-3' placeholder='E-mail' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input className='form-control mb-3' placeholder='Mobile No' value={mobileNo} onChange={(e)=>{setmobileNo(e.target.value)}}/>
                <input className='form-control mb-3' placeholder='City' value={city} onChange={(e)=>{setcity(e.target.value)}}/>
                <div className="mb-3">
                    <label>Gender</label>
                    <input type='radio' className='form-radio mx-3' name='gender' value='male' id='male' onChange={(e)=>{setgender(e.target.value)}}/>
                    <label htmlFor='male'>Male</label>
                    <input type='radio' className='form-radio mx-3' name='gender' value='female' id='female' onChange={(e)=>{setgender(e.target.value)}}/>
                    <label htmlFor='female'>Female</label>
                    <input type='radio' className='form-radio mx-3' name='gender' value='others' id='others' onChange={(e)=>{setgender(e.target.value)}}/>
                    <label htmlFor='female'>Others</label>
                </div>
                <input type='password' className='form-control mb-3' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <input type='password' className='form-control mb-3' placeholder='Confirm Password' value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
                <button type='submit' className='btn btn-dark'>Register</button>
            </form>
        </div>
    );
}
