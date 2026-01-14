import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RequestPage.css';
export default function RequestPage(){
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://library-management-system-backend-1-i28x.onrender.com/api/issue/allRequest',{withCredentials:true});
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


    const handleApprove=async(userId,name,gmail,isbn,author)=>{
        const send={userId,name,gmail,isbn,author};
        try{
const response=await axios.post("https://library-management-system-backend-1-i28x.onrender.com/api/approve/approveRequest",send,{withCredentials:true});
if(response.data.message=== 'user added successfully'){
    alert('email send to user for request granted');

try{
    const send={userId,name,gmail,isbn,author};
const response=await axios.post('https://library-management-system-backend-1-i28x.onrender.com/api/issued/create',send,{withCredentials:true});
if(response.data.message=== 'added successfully'){
    alert('issued Book added to admin Panel successfully');
}
}catch(err){
    if(err.response?.data?.message=== 'provide proper details'){
        alert('provide proper details');
    }
}
}
        }catch(err){
            if(err.response?.data?.message=== 'provide proper details'){
                alert('provide proper details');
            }else if(err.response?.data?.message=== 'your request for this book already send'){
                alert('your request for this book already send');
            }else if(err.response?.data?.message=== 'Out Of Stock'){
                alert('Out Of Stock');
            }
        }
    }

    const handleDelete=async(name,gmail,userId,author,isbn)=>{
        const send={name,gmail,userId,author,isbn};
        try{
const response=await axios.post("https://library-management-system-backend-1-i28x.onrender.com/api/approve/deleteRequest",send,{withCredentials:true});
if(response.data.message=== 'user request reject successfully'){
    alert('user request reject successfully');
}
        }catch(err){
            if(err.response?.data?.message=== 'provide proper details'){
                alert('provide proper details')
            }else if(err.response?.data?.message=== 'not found'){
                alert('user not found');
            }
        }
    }
    const handle=()=>{
        navigate('/AdminApproved');
    }
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
                    <p>Isbn:{all.isbn}</p>
                    <p>Author Of Book:{all?.author}</p>
                    <p>Department Of Student:{all?.department}</p>
                   <div className="button-box">
              <button onClick={()=>handleApprove(all?.userId,all?.name,all?.gmail,all?.isbn,all?.author)} className="approve-btn">Approve</button>
              <button onClick={()=>handleDelete(all?.name,all?.gmail,all?.userId,all?.author,all?.isbn)} className="reject-btn">Reject</button>
            </div>
                </div>
            ))
        }
        </div>
        </div>

        <button className='issue-btn' onClick={handle}>Admin Approved Book Issue</button>
        </>
    );
}