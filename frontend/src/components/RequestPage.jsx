import {useState,useEffect} from 'react';
import axios from 'axios';
import './RequestPage.css';
export default function RequestPage(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://library-management-system-backend-nleu.onrender.com/api/issue/allRequest',{withCredentials:true});
if(response.data.message=== 'here are all the issue request'){
    setData(response.data.data);
}
            }catch(err){
                if(err.response?.data?.message=== 'no issue yet'){
                    alert('no issue yet');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
        <div className="request-page">
        <h1>This are the book issue request grant them if you want</h1>
        <div className="request-container">
        {
            data.map((all,index)=>(
                <div className="request-card" key={index}>
                    <p>UserId:{all?.userId}</p>
                    <p>Name Of Student:{all?.name}</p>
                    <p>Gmail Of Student:{all?.gmail}</p>
                    <p>Author Of Book:{all?.author}</p>
                    <p>Department Of Student:{all?.department}</p>
                    <p>quantity:{all?.quantity}</p>
                   <div className="button-box">
              <button className="approve-btn">Approve</button>
              <button className="reject-btn">Reject</button>
            </div>
                </div>
            ))
        }
        </div>
        </div>
        </>
    );
}