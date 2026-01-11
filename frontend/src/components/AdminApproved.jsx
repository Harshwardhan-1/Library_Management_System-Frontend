import { useState,useEffect } from "react";
import axios from "axios";
import './AdminApproved.css';
export default function AdminApproved(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
    const response=await axios.get("https://library-management-system-backend-nleu.onrender.com/api/issued/allIssued",{withCredentials:true});
    setData(response.data.data);
            }catch(err){
                if(err){
                    console.log(err);
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
         <div className="admin-approved-page">
        <h1>Admin Approved Request</h1>

        {
            data.map((all,index)=>(
                <div className="admin-approved-card" key={index}>
                    <p>{all?.userId}</p>
                    <p>{all?.name}</p>
                    <p>{all?.gmail}</p>
                    <p>{all?.isbn}</p>
                    <p>{all?.author}</p>
                    <button>Delete</button>
                    <button>Return Book</button>
                </div>
            ))
        }
        </div>
        </>
    );
}