import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/Orders.css";
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/getorders');
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='o-main'>
      {orders.map((item, index) => (
        <OrderItem key={index} item={item} />
      ))}
    </div>
  );
}

function OrderItem({ item }) {
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

  
  const handleapprove = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.put('http://localhost:8080/putorders', {
        id:item.id,
        user:item.user,
        itemId:item.itemId,
        dtype:item.dtype,
        address:item.address,
        status:"Approved",
        quantity:item.quantity
      });
      alert("Item added successfully:", response.data);
    } catch (error) {
      alert("Error adding item:", error.message);
    }
  };

  const handlereject = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.put('http://localhost:8080/putorders', {
        id:item.id,
        user:item.user,
        itemId:item.itemId,
        dtype:item.dtype,
        address:item.address,
        status:"Rejected",
        quantity:item.quantity
      });
      alert("Item added successfully:", response.data);
    } catch (error) {
      alert("Error adding item:", error.message);
    }
  };

  const handledelivered = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.put('http://localhost:8080/putorders', {
        id:item.id,
        user:item.user,
        itemId:item.itemId,
        dtype:item.dtype,
        address:item.address,
        status:"Served",
        quantity:item.quantity
      });
      alert("Item added successfully:", response.data);
    } catch (error) {
      alert("Error adding item:", error.message);
    }
  };
  return (
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
      {item.status !== "Served" ? (item.status === "process" ?<div className='row'>
        <button className='btn btn-success col m-2' onClick={handleapprove}>Approve</button>
        <button className='btn btn-danger col m-2' onClick={handlereject}>Reject</button>
      </div> : (item.status === "Approved" ? (<button className='btn btn-warning' onClick={handledelivered}>Served</button>):(<p className='fw-bold fs-4'>Rejected</p>))):(<p className='fw-bold fs-4'>Completed</p>)}
    </div>
  );
}
