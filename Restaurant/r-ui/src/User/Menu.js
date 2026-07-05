import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import "../Styles/Menu.css"
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../Usercontext';
export default function (props) {
  const [items, setitems] = useState([]);
  const [dtype, setdtype] = useState('');
  const [address,setaddress] = useState('');
  const [quantity, setquantity] = useState('');
  const {user} = useContext(Usercontext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://localhost:8080/getitems');
        const rest = res.data.filter((item) => item.category === props.srestaurant.category)
        setitems(rest);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchdata();

  }, []);

  const handleItems = async (e) => {
    e.preventDefault(); 
    if (dtype === ""|| address === ""|| quantity === ""){
      alert("Please fill all the fields");
    }else{
    try {
      const response = await axios.post('http://localhost:8080/postorders', {
        user:user.email,
        itemId:props.srestaurant.id,
        dtype:dtype,
        address:address,
        status:"process",
        quantity:quantity
      });
      alert("Ordered successfully:", response.data);
      navigate(-1); 
    } catch (error) {
      alert("Error adding item:", error.message);
    }}
  };
  return (
    <>
      <div className='m-main' >
        <img src={props.srestaurant.image} alt={props.srestaurant.name} className='m-img1'/>
        <div className='m-in mt-3'>
        <h1>{props.srestaurant.name}</h1>
        <p className='fs-5 fw-bold mt-3'>{props.srestaurant.discription}</p>
        <p className='fw-bold'>₹{props.srestaurant.price}</p>
        <select value={dtype} className='form-select mb-3' onChange={(e)=>{setdtype(e.target.value)}}>
          <option value="" disabled>Select the type</option>
          <option value='Delivery'>Delivery</option>
          <option value='Pickup'>Pickup</option>
        </select>
        <input value={address} placeholder='Address' onChange={(e)=>{setaddress(e.target.value)}} className='form-control mb-3'/>
        <input value={quantity} type='number' placeholder='Quantity' onChange={(e)=>{setquantity(e.target.value)}} className='form-control mb-3'/>
        <p>total Price = {quantity*parseInt(props.srestaurant.price)}</p>
        <button className='btn btn-dark w-75' onClick={(e)=>{handleItems(e)}}>Book Now</button>
        </div>
      </div>
      <h3 className='fw-bold mx-3'>Related Items</h3>
      <div className='m-card-contain'>{items.map((item) => {
        return (
          <div className='card m-card'>
            <img src={item.image} alt={item.name} className='m-img'/>
            <p className='m-text mt-3'>{item.name}</p>
            <p className='m-text'>₹{item.price}</p>
            <button className='btn btn-dark' onClick={()=>{
                props.setsrestaurant(item);
                navigate("/usermain/menu")
              }}>Book</button>
          </div>
        )
      })}</div>
    </>
  )
}
