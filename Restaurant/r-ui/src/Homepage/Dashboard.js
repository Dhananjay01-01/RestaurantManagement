import React from 'react'
import { useNavigate } from 'react-router-dom'
import food from "../Assets/food.jpg"
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <section className='h-container row m-5'>
        <div className='col mag'>
          <h1 className='h-h1'><span className='h-in fw-bold'>Fa</span>stest</h1>
          <h1 className='h-h1'>Delivery and <span className='h-in fw-bold'>Easy </span>Pickup</h1>
          <p className='h-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <hr className='h-hr' />
          <div className='h-row'>
            <button className='btn btn-dark   w-100' onClick={(e) => { e.preventDefault(); navigate("/login") }}>Login to Orderer Now</button>
          </div>
        </div>
        <div className='col'>
          <img src={food} alt='food' className='h-img' />
        </div>
      </section>
    </>
  )
}
