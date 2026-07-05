import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function FeedbackView() {
  const [history , sethistory]  = useState([]);
  useEffect(() => {
      const fetchOffers = async () => {
        try {
          const res = await axios.get("http://localhost:8080/getfeedback");
          sethistory(res.data);
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
      };
  
      fetchOffers();
    }, []);
return (
  <>
  <div className='m-5 '>
      <h2 className='text-center'>Feedback</h2>
      <table className='table table-bordered text-center '>
          <thead className='table-dark'>
              <tr>
              <td>Sl.no</td>
              <td>User</td>
              <td>Feedback</td>
              </tr>
          </thead>
          <tbody>
              {history.map((item,index)=>{
                  return(
                      <tr>
                          <td>{index+2}</td>
                          <td>{item.user}</td>
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
