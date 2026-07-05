import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import log from "../Assets/log.png"
export default function Restaurantmain() {
  const location = useLocation();
  return (
    <>
      <header>
        <img src={log} alt='logo' className='logos' />
        <NavLink to="/restaurantmain" text="Orders" currentPath={location.pathname} />
        <NavLink to="/restaurantmain/addhalls" text="Offers" currentPath={location.pathname} />
        <NavLink to="/restaurantmain/additem" text="Items" currentPath={location.pathname} />
        <NavLink to="/restaurantmain/addtable" text="Tables" currentPath={location.pathname} />
        <NavLink to="/restaurantmain/addcategories" text="Add Categories" currentPath={location.pathname} />
        <NavLink to="/restaurantmain/feedbackview" text="Feedback" currentPath={location.pathname} />
        <NavLink to="/" text="Log out" currentPath={location.pathname} />
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
