import React, { useState } from 'react'
import "../Styles/More.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
export default function AddCategories() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [discription, setdiscription] = useState('');
  const [image, setimage] = useState('')
  const handelimage = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setimage(reader.result);
    }
  };
  const handlecategory = async () => {
    if (name === '' || discription === '' || image === '') {
      toast.warning('Please fill all the fields');
    } else {
     await  fetch('http://localhost:8080/postcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          discription: discription,
          image: image,
        }),
      })
      .then(() => {
         alert("Category Succesfully Addedd")
        })
      .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <><div className='backscreen' onClick={()=>{navigate(-1)}}></div>
    <div className='container'>
      <form className='card  p-4 const ' onSubmit={handlecategory}>
        <h1 className='text-center m-3'>Add Category</h1>
        <input placeholder='name'  className='form-control mb-3' value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <input placeholder='description' className='form-control mb-3' value={discription} onChange={(e)=>{setdiscription(e.target.value)}}/>
        <input type='file' accept='image/*' className='form-control mb-3' onChange={(e)=>{handelimage(e)}}/>
        <button className='btn btn-dark' type='submit'>Add</button>
      </form>
    </div>
    </>
  )
}
