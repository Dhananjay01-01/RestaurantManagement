import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AddItems() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [discription, setdiscription] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type,settype] = useState('veg');
  const handleImage = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getcategory");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleItems = async (e) => {
    e.preventDefault(); 
    if(name === ""|| price === ""|| image === ""||discription === ""|| type === ""|| category === "" ){
      alert("Please Fill All details")
    }else{
    try {
      const response = await axios.post('http://localhost:8080/postitems', {
        name: name,
        price: price,
        image: image,
        discription: discription,
        type : type,
        category: category,
      });
      alert("Item added successfully:", response.data);
      navigate(-1); 
    } catch (error) {
      alert("Error adding item:", error.message);
    }}
  };

  return (
    <>
      <div className='backscreen' onClick={() => { navigate(-1) }}></div>
      <div className='container'>
        <form className='card p-4 const' onSubmit={handleItems}>
          <h1 className='text-center m-3'>Add Items</h1>
          <input placeholder='Name' className='form-control mb-3' value={name} onChange={(e) => { setName(e.target.value) }} />
          <input placeholder='Price' type='number' className='form-control mb-3' value={price} onChange={(e) => { setPrice(e.target.value) }} />
          <input placeholder='description' className='form-control mb-3' value={discription} onChange={(e)=>{setdiscription(e.target.value)}}/>
          <input type='file' className='form-control mb-3' onChange={handleImage} />
          <select className='form-select mb-3' value={category} onChange={(e) => { setCategory(e.target.value) }}>
            <option value="" disabled>Select the category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.name}>{item.name}</option>
            ))}
          </select>
          <select className='form-select mb-3' value={type} onChange={(e) => { settype(e.target.value) }}>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          <button className='btn btn-dark' type='submit'>Add Item</button>
        </form>
      </div>
    </>
  );
}
