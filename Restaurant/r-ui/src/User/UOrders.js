import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/Orders.css";
import { Usercontext } from '../Usercontext';

export default function UOrders() {
  const [orders, setOrders] = useState([]);
  const [reserve, setReserve] = useState([]);
  const {user} = useContext(Usercontext); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/getorders');
        const rest = res.data.filter(item => item.user === user.email)
        const resReserve = await axios.get('http://localhost:8080/getreserve');
        const resy = resReserve.data.filter(item => item.user === user.email)
        setOrders(rest);
        setReserve(resy);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (<>
    <div className='o-main'>
      {orders.map((item, index) => (
        <OrderItem key={index} item={item}/>
      ))}
    </div>
    <center>
    <p className='btn btn-dark mx-auto'>Reservations</p>
    </center>
      <div className='o-main'>
        {reserve.map((item, index) => (
          <div className='card p-3 m-2' key={index}>
            <h6><b>User : &nbsp;</b>{item.user}</h6>
            <p><b>Time : &nbsp;</b>{item.time}</p>
            <p><b>Table : &nbsp;</b>{item.tableId}</p>
            <center>
            {item.status === 'pending' ? (
               <p className='fw-bold text-warning' >In Process</p>
            ) : (item.status === "rejected" ? <p className='fw-bold text-danger'>Rejected</p> : (item.status === "completed" ? (<p className='fw-bold text-success'>Completed</p>) : <p className='fw-bold'>Waiting For You</p>))}
            </center>
          </div>
        ))}
      </div>
    </>
  );
}

function OrderItem({ item}) {
  const [additionalData, setAdditionalData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/getbyid/${item.itemId}`);
        setAdditionalData(res.data);
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };
    fetchData();
  }, [item.itemId]);

  return (
    <>
    <div className='card o-sub'>
      <div class="card-header">
        <p className='card-title text-center fw-bold '>{additionalData ? additionalData.name : ""}</p>
      </div>
      <img src={additionalData ? additionalData.image : ""} alt='food' className='o-img' />
      <p className='mt-2'><b>User : &nbsp;</b>{item.user}</p>
      <p><b>Address : &nbsp;</b>{item.address}</p>
      <p><b>kind : &nbsp;</b>{item.dtype}</p>
      <p><b>Quantity : &nbsp;</b>{item.quantity}</p>
      <p><b>Toatalprice : &nbsp;</b>{additionalData ? parseInt(additionalData.price) * parseInt(item.quantity) : ""}</p>
      {item.status !== "Served" ? (item.status === "process" ? <p className='fw-bold text-warning fs-4'>Process</p> : (item.status === "Approved" ? (<p className='fw-bold text-warning fs-4'>Getting Ready</p>):(<p className='fw-bold text-danger fs-4'>Rejected</p>))):(<p className='fw-bold text-success fs-4'>Completed</p>)}
    </div>
    
    </>
  );
}