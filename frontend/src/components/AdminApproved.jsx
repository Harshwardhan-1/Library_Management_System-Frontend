import { useState,useEffect } from "react";
import axios from "axios";
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
        <h1>Admin Approved Request</h1>

        {
            data.map((all,index)=>{
                <div key={index}>
                    <p>{data?.userId}</p>
                    <p>{data?.name}</p>
                    <p>{data?.gmail}</p>
                    <p>{data?.isbn}</p>
                    <p>{data?.author}</p>
                </div>
            })
        }
        </>
    );
}