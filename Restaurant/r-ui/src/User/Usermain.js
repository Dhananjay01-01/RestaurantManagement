import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import log from "../Assets/log.png"
import "../Styles/HomeMain.css"
import axios from 'axios'
import { BsStack } from "react-icons/bs";
export default function HomeMain(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getcategory");
        setCategory(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <>
      <header>
        <img src={log} alt='logo' className='logo' />
        <input className="form-control  w-25 mx-5" type="search" placeholder="Search" aria-label="Search" onSelect={() => { navigate("/usermain") }} onChange={(e)=>{props.setsearch(e.target.value)}}/>
        <NavLink to="/usermain" text="home" currentPath={location.pathname} />
        <NavLink to="/usermain/uorders" text="Orders" currentPath={location.pathname} />
        <NavLink to="/usermain/contact" text="Contact" currentPath={location.pathname} />
        <li className="dropdown">
          <p className="drop text-center mb-4"><BsStack />  Categories</p>
          <div className="dropdown-content">
            {category.map((item,index)=>{return(
              <p key={index} value={item.name} className='drops' onClick={(e)=>{props.setcatdrop(item.name);navigate("/usermain")}}>{item.name}</p>
            )})}
          </div>
        </li>
        <NavLink to="/usermain/feedback" text="Feedback" currentPath={location.pathname}/>
        <NavLink to="/" text="Logout" currentPath={location.pathname}/>
      </header>
      <div className='outlet'>
      <Outlet />
      </div>
    </>
  )
}
function NavLink({ to, text, currentPath }) {
  const isActive = currentPath === to;
  return (
    <Link to={to} className={`links ${isActive ? 'active' : ''}`}>
      {text}
    </Link>
  );
}