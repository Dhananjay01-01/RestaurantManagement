import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Addtable() {
  const [discription, setDiscription] = useState('');
  const [tables, setTables] = useState([]);
  const [reserve, setReserve] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTables = await axios.get('http://localhost:8080/gettables');
        const resReserve = await axios.get('http://localhost:8080/getreserve');
        setTables(resTables.data);
        setReserve(resReserve.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTable = () => {
    if (discription === '') {
      alert("Fill all the fields");
    } else {
      fetch('http://localhost:8080/posttables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: discription,
          status: "Pending"
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Added Successfully");
          navigate(-1);
        })
        .catch((err) => alert(err));
    }
  };

  const handleStatus = async (status, status0, id, item) => {
    try {
      await axios.put(`http://localhost:8080/putstatus/${status0}/${id}`);
      await axios.put("http://localhost:8080/putreserve", {
        id: item.id,
        tableId: item.tableId,
        time: item.time,
        user: item.user,
        status: status
      })
      alert("Updated successfully");
    } catch (error) {
      alert("Error updating status");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className='o-main p-3'>
        <form className='card h-card p-3' onSubmit={handleTable}>
          <h1 className='text-center m-3'>Add Table</h1>
          <input placeholder='description' className='form-control mb-3' value={discription} onChange={(e) => { setDiscription(e.target.value) }} />
          <button className='btn btn-dark' type='submit'>Add Table</button>
        </form>
        {tables.map((item, index) => (
          <div className='card p-3 t-card' key={index}>
            <p><b>Table Id : &nbsp;</b>{item.id}</p>
            <p><b>Description : &nbsp;</b>{item.description}</p>
            <p><b>Status : </b>{item.status}</p>
          </div>
        ))}
      </div>
      <center>
      <p className='btn btn-dark'>Reservations</p>
      </center>
      <div className='o-main'>
        {reserve.map((item, index) => (
          <div className='card p-3 m-2' key={index}>
            <h6><b>User : &nbsp;</b>{item.user}</h6>
            <p><b>Time : &nbsp;</b>{item.time}</p>
            <p><b>Table : &nbsp;</b>{item.tableId}</p>
            {item.status === 'pending' ? (
              <div>
                <button className='btn btn-success mx-2' onClick={() => { handleStatus("Waiting", "Waiting", item.tableId, item) }}>Approve</button>
                <button className='btn btn-danger' onClick={() => { handleStatus("rejected", "pending", item.tableId, item) }}>Reject</button>
              </div>
            ) : (item.status === "rejected" ? <p className='fw-bold text-danger'>Rejected</p> : (item.status === "completed" ? (<p className='fw-bold text-success'>Completed</p>) : <button className='btn btn-warning' onClick={() => { handleStatus("completed", "pending", item.tableId, item) }}>Completed</button>))}
          </div>
        ))}
      </div>
    </>
  );
}
