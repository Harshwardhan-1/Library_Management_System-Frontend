import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AdminApproved.css';
export default function AdminApproved(){
    const navigate=useNavigate();
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

    const handleReturn=async(userId,name,gmail,isbn,author,date)=>{
        const send={userId,name,gmail,isbn,author,date};
        try{
const response=await axios.post('https://library-management-system-backend-nleu.onrender.com/api/return/succReturn',send,{withCredentials:true});
if(response.data.message=== 'successfully created'){
    alert('user successfully return book');

    try{
        const send={userId,isbn,author};
const response=await axios.post('https://library-management-system-backend-nleu.onrender.com/api/return/deleteIt',send,{withCredentials:true});
if(response.data.message=== 'userDeleted'){
    alert('user Deleted');
}
    }catch(err){
        if(err.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
        }else if(err.response?.data?.message=== 'not found'){
            alert('Not Found');
        }
    }
}
        }catch(err){
            if(err.response?.data?.messsage=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(err.response?.data?.message=== 'not found'){
                alert('not found');
            }else if(err.response?.data?.message=== 'fine Model created successfully'){
                alert('pay 50 rupees fine and then you can return and fine model created successfully');
            }
        }
    }
    
    const handlefine=()=>{
        navigate('/FinePage');
    }
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
                    <p><strong>Issued Date:{new Date(all.date).toLocaleDateString()} </strong></p>
                     <button className="return-book" onClick={()=>handleReturn(all?.userId,all?.name,all?.gmail,all?.isbn,all?.author,all.date)}>Return Book</button>
                </div>
            ))
        }
        </div>

        <button onClick={handlefine}  className="issue-btn">Fine Left Page</button>
        </>
    );
}