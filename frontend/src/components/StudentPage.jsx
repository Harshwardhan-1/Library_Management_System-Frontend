import { useState,useEffect } from "react";
import axios from 'axios';
export default function StudentPage(){
const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://library-management-system-backend-nleu.onrender.com/api/student/checkStudent',{withCredentials:true});
if(response.data.message=== 'user Exist'){
    setData(response.data.data);
}
            }catch(err){
                if(err.response?.data?.message=== 'user not found'){
                    alert('user not found');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
        <h1>This is Student Page</h1>
       <div>
        <p>{data?.name}</p>
        <p>{data?.gmail}</p>
        <p>{data?.rollNo}</p>
        <p>{data?.department}</p>
        <p>{data?.section}</p>
        <p>{data?.phoneNo}</p>
        <button>Show all books</button>
       </div>
        </>
    );
}