import React, { useEffect, useState } from 'react'
import "../Styles/Userhome.css"
import food from "../Assets/food.jpg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
export default function Userhome(props) {
  const [items, setitems] = useState([]);
  const [filtereditems, setfiltereditems] = useState([]);
  const [offers, setoffers] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get('http://localhost:8080/getitems');
        const off = await axios.get('http://localhost:8080/getoffer');
        setoffers(off.data)
        setitems(res.data);
        setfiltereditems(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchdata();

  }, []);

  useEffect(() => {
    const data = items.filter(
      (item) => {
        return item.name.toLowerCase().includes(props.search.toLowerCase());
      }
    )
    setfiltereditems(data);
  }, [props.search])

  useEffect(() => {
    const data = items.filter(
      (item) => {
        return item.category.toLowerCase().includes(props.catdrop.toLowerCase());
      }
    )
    setfiltereditems(data);
  }, [props.catdrop])
  return (
    <>
      <Carousel className='curousel'>
        {offers.map((off) => {
          return (
            <Carousel.Item>
              <img src={off.image} alt='ima' className='offer-image' />
              <div class="carousel-caption d-none d-md-block">
                <h5>{off.discription}</h5>
              </div>

            </Carousel.Item>
          )
        })}
      </Carousel>
      <div>


      </div>
      <section className='h-container row'>
        <div className='col mag'>
          <h1 className='h-h1'><span className='h-in fw-bold'>Fa</span>stest</h1>
          <h1 className='h-h1'>Delivery and <span className='h-in fw-bold'>Easy </span>Pickup</h1>
          <p className='h-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <hr className='h-hr' />
          <div className='h-row'>
            <button className='btn btn-dark mx-3  w-25' onClick={() => {
              setfiltereditems(items.filter(item => item.type === 'veg'))
            }}>Veg</button>
            <button className='btn btn-dark mx-3  w-25' onClick={() => {
              setfiltereditems(items.filter(item => item.type === 'non-veg'))
            }}>Non-Veg</button>

          </div>
        </div>
        <div className='col'>
          <img src={food} alt='food' className='h-img' />
        </div>
      </section>
      <div className='h-divs'>
        {filtereditems.map((item, index) => {
          return (
            <div className='card m-4 h-rests' key={index}>
              <img src={item.image} alt='food' className='r-img' />
              <h4>{item.name}</h4>
              <p className='h-time'>{item.type}</p>
              <p >{item.discription}</p>
              <p className='fw-bold'>₹{item.price}</p>
              <hr className='h-hrrests'></hr>
              <div className='row'>
                <button className='btn btn-dark m-2 col'
                  onClick={(e) => { e.preventDefault(); navigate("/usermain/reserve") }}>
                  Click to reserve tables
                </button>
                <h6 className='btn btn-dark m-2 col' onClick={() => {
                  props.setsrestaurant(item);
                  navigate("/usermain/menu")
                }}>Book now →</h6>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
