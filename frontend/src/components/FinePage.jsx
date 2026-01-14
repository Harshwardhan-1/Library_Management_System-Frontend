import { useState,useEffect } from "react";
import axios from "axios";
import './finePage.css';
export default function FinePage(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get("https://library-management-system-backend-1-i28x.onrender.com/api/fine/allFine",{withCredentials:true});
setData(response.data.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch();
    },[]);

    const handleDelete=async(userId,name,gmail,isbn,author)=>{
        const send={userId,name,gmail,isbn,author};
        try{
    const response=await axios.post('https://library-management-system-backend-1-i28x.onrender.com/api/return/paidFine',send,{withCredentials:true});
    if(response.data.message=== 'user successfully pay fine'){
        alert('user successfully pay the fine');
    }
        }catch(err){
            if(err.response?.data?.message=== 'provide proper details'){
                alert('provide proper details');
            }else if(err.response?.data?.message=== 'user not found'){
                alert('user not found');
            }
        }
    }

    return(
        <>
        <div className="fine-wrapper">
        <h1>This is the page of Fine Student</h1>

        {
            data.map((all,index)=>(
                <div className="fine-card" key={index}>
                    <p>UserId:{all?.userId}</p>
                    <p>Name:{all?.name}</p>
                    <p>email:{all?.gmail}</p>
                    <p>isbn:{all?.isbn}</p>
                    <p>author:{all?.author}</p>
                 <p><strong>Fine Date:{new Date(all.returnDate).toLocaleDateString()} </strong></p>
                 <button onClick={()=>handleDelete(all?.userId,all?.name,all?.gmail,all?.isbn,all?.author)}  className="del">Approve Fine And Delete</button>
                </div>
            ))
        }
        </div>
        </>
    );
}