import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../Usercontext';
import axios from 'axios';

export default function Feedback() {
    const [feedback, setfeedback] = useState('');
    const [history , sethistory]  = useState([]);
    const {user} = useContext(Usercontext);
    useEffect(() => {
        const fetchOffers = async () => {
          try {
            const res = await axios.get("http://localhost:8080/getfeedback");
            const reso = res.data.filter(item => item.user === user.email);
            sethistory(reso);
          } catch (error) {
            console.error("Error fetching offers:", error);
          }
        };
    
        fetchOffers();
      }, []);
    const handleItems = async (e) => {
        e.preventDefault(); 
        if(feedback === ""){
          alert("Please Enter Your Feedback");
          return;
        }else{
        try {
          const response = await axios.post('http://localhost:8080/postfeedback', {
           user:user.email,
           feedback:feedback
          });
          alert("Thank You For giving Feedback", response.data);
        } catch (error) {
          alert("Error adding offer:", error.message);
        }}
      };
  return (
    <>
    <div className='m-5 '>
        <h2 className='text-center'>Feedback</h2>
        <table className='table table-bordered text-center '>
            <thead className='table-dark'>
                <tr>
                <td>Sl.no</td>
                <td>Feedback</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td className='d-flex'><input placeholder='Your Feedback' className='form-control' value={feedback} onChange={(e)=>{setfeedback(e.target.value)}}/>
                    <button className='btn btn-dark w-50 mx-2' onClick={handleItems}>Give Feedback</button></td>
                </tr>
                {history.map((item,index)=>{
                    return(
                        <tr>
                            <td>{index+2}</td>
                            <td>{item.feedback}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </>
  )
}
