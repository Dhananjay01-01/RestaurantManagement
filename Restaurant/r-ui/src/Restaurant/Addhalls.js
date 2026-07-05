import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/offers.css";

export default function Addhalls() {
  const [discription, setDiscription] = useState('');
  const [image, setImage] = useState('');
  const [offers, setOffers] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectid,setselectid] = useState();
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getoffer");
        setOffers(res.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleItems = async (e) => {
    e.preventDefault(); 
    if(image === "" || discription === ''){
      alert("PLease fill all details")
    }else{
    try {
      const response = await axios.post('http://localhost:8080/postoffer', {
        image: image,
        discription: discription
      });
      alert("Offer added successfully:", response.data);
    } catch (error) {
      alert("Error adding offer:", error.message);
    }}
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handledelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteoffer/${selectid}`)
      alert("Offer Deleted successfully:", response.data);
    } catch (error) {
      alert("Error deleting offer:", error.message);
    }
  };
  return (
    <div className='o-main p-3'>
      <form className='card h-card p-3' onSubmit={handleItems}>
        <h1 className='mb-3'>Add Offers</h1>
        <textarea placeholder='Description' className='form-control mb-5' value={discription} onChange={(e) => setDiscription(e.target.value)} />
        <input type='file' className='form-control mb-5' onChange={handleImage} />
        <button className='btn btn-dark' type='submit'>Add Offer</button>
      </form>

      {offers.map((item, index) => (
        <div key={index} className='o-offers card p-3'>
          <img src={item.image} className='o-image' alt='0-00' />
          <p>{showFullDescription ? item.discription : `${item.discription.slice(0, 100)}...`}
            {item.discription.length > 100 &&
              <button onClick={toggleDescription} className='btn btn-link'>{showFullDescription ? "Read Less" : "Read More"}</button>
            }
          </p>
          <button className='btn btn-danger' onClick={()=>{
            setselectid(item.id);
            handledelete();
          }}>Delete</button>
        </div>
      ))}
    </div>
  );
}
