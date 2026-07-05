import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../Usercontext';
export default function Reserve() {
    const navigate = useNavigate();
    const [tableId, settableId] = useState('')
    const [table, settable] = useState([]);
    const [time, settime] = useState('');
    const { user } = useContext(Usercontext)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get('http://localhost:8080/gettables');
                const reso = res.data.filter(item => item.status === 'Pending')
                settable(reso);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchdata();

    }, [])

    const handletable = () => {
        if (tableId === '' || time === '') {
            alert('Please fill all the fields')
        }
        else {
            try {
                const res = axios.post("http://localhost:8080/postreserve", {
                    tableId: tableId,
                    time: time,
                    user: user.email,
                    status:"pending"
                })
                alert("reserved")
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <div>
            <div className='backscreen' onClick={() => { navigate(-1) }}></div>
            <div className='container'>
                <form className='card p-4 const' onSubmit={handletable}>
                    <h1>Reserve Tables</h1>
                    <select className='form-select mb-3' value={tableId} onChange={(e) => { settableId(e.target.value) }}>
                        <option value="" disabled>Select the table</option>
                        {table.map((item, index) => {
                            return (
                                <option value={item.id}>{item.id}</option>
                            )
                        })}
                    </select>
                    <div>
                        <label className='form-label'>Time</label>
                        <input type='time' className='form-control' value={time} onChange={(e) => { settime(e.target.value) }} />
                        <button className='btn btn-dark my-2 w-100' type='submit'>Reserve</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
