import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import log from "../Assets/log.png"
import "../Styles/HomeMain.css"
export default function HomeMain() {
    const location = useLocation();
    return (
        <>
            <header>
                <img src={log} alt='logo' className='logo0'/>
                <NavLink to="/login" text="login" currentPath={location.pathname} />
                <NavLink to="/registration" text="registration" currentPath={location.pathname} />
            </header>

            <Outlet />
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