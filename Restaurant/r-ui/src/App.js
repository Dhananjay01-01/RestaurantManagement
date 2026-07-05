import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Homepage/Dashboard';
import HomeMain from './Homepage/HomeMain';
import Login from './Homepage/Login';
import Registration from './Homepage/Registration';
import { Usercontext } from './Usercontext';
import { useEffect, useState } from 'react';
import Restaurantmain from './Restaurant/Restaurantmain';
import Orders from './Restaurant/Orders';
import Addtable from './Restaurant/Addtable';
import Additems from './Restaurant/Additems';
import Addhalls from './Restaurant/Addhalls';
import Usermain from './User/Usermain.js';
import UOrders from './User/UOrders';
import Userhome from './User/Userhome';
import Menu from './User/Menu';
import Contact from './User/Contact';
import AddCategories from './Restaurant/AddCategories.js';
import Reserve from './User/Reserve.js';
import Feedback from './User/Feedback.js';
import FeedbackView from './Restaurant/FeedbackView.js';
function App() {
  const [user, setuser] = useState(() => {
    try {
      const item = window.localStorage.getItem('user');
      return item ? JSON.parse(item) : {}
    } catch (error) {
      console.log(error);
      return {}
    }
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user]);

  const [search,setsearch] = useState(() => {
    try {
      const item = window.localStorage.getItem('search');
      return item ? JSON.parse(item) : {}
    } catch (error) {
      console.log(error);
      return {}
    }
  });

  useEffect(() => {
    localStorage.setItem('search', JSON.stringify(search))
  }, [search]);

  const [srestaurant,setsrestaurant] =  useState(() => {
    try {
      const item = window.localStorage.getItem('srestaurant');
      return item ? JSON.parse(item) : {}
    } catch (error) {
      console.log(error);
      return {}
    }
  });

  useEffect(() => {
    localStorage.setItem('srestaurant', JSON.stringify(srestaurant))
  }, [srestaurant]);


  const [catdrop, setcatdrop] = useState(() => {
    try {
      const item = window.localStorage.getItem('catdrop');
      return item ? JSON.parse(item) : {}
    } catch (error) {
      console.log(error);
      return {}
    }
  });

  useEffect(() => {
    localStorage.setItem('catdrop', JSON.stringify(catdrop))
  }, [catdrop]);

  return (
    <>
      <Usercontext.Provider value={{user,setuser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeMain />} >
              <Route index element={<Dashboard />} />
              <Route path="login" element={<Login />} />
              <Route path='registration' element={<Registration />} />
            </Route>

            <Route path='restaurantmain' element={<Restaurantmain/>}>
              <Route path='addcategories' element={<AddCategories/>}/>
              <Route index element={<Orders/>}/>
              <Route path='Addtable' element={<Addtable/>}/>
              <Route path='Additem' element={<Additems/>}/>
              <Route path='Addhalls' element={<Addhalls/>}/>
              <Route path='feedbackview' element={<FeedbackView/>}/>
            </Route>

            <Route path='usermain' element={<Usermain  setsearch={setsearch} setcatdrop={setcatdrop}/>}>
              <Route path='uorders' element={<UOrders/>}/>
              <Route index element={<Userhome search={search} setsrestaurant={setsrestaurant} catdrop={catdrop}/>}/>
              <Route path='menu' element={<Menu srestaurant={srestaurant} setsrestaurant={setsrestaurant}/>}/>
              <Route path='contact' element={<Contact/>}/>
              <Route path='reserve' element={<Reserve/>}/>
              <Route path='feedback'  element={<Feedback/>}/>
            </Route>      
          </Routes>
        </BrowserRouter>
      </Usercontext.Provider>
    </>
  );
}

export default App;
