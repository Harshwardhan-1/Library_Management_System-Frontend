import { useState,useEffect } from "react";
import axios from 'axios';
import './StudentPage.css';
export default function StudentPage(){
const [data,setData]=useState([]);
const [books,setBooks]=useState([]);
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


    const handleBooks=async(department)=>{
        const send={department};
        try{
const response=await axios.post('https://library-management-system-backend-nleu.onrender.com/api/admin/handleBooks',send,{withCredentials:true});
if(response.data.message=== 'showBooks'){
    alert('This are the books of CSE Department');
    setBooks(response.data.data);
}
        }catch(err){
            if(err.response?.data?.message=== 'no record found'){
                alert('no books to show right now we will let you know when book are ready to show');
            }else if(err.response?.data?.message=== 'provide proper detail'){
                alert('provide department first');
            }
        }
    }
    return(
        <>
        <h1 className="student-title">This is Student Page</h1>
       <div  className="student-card">
        <p>{data?.name}</p>
        <p>{data?.gmail}</p>
        <p>{data?.rollNo}</p>
        <p>{data?.department}</p>
        <p>{data?.section}</p>
        <p>{data?.phoneNo}</p>
        <button className="student-btn" onClick={()=>handleBooks(data?.department)}>Show all books</button>
       </div>


       {
        books.map((all,index)=>(
            <div key={index}>
                <p>{all.isbn}</p>
                <p>{all.bookName}</p>
                <p>{all.author}</p>
                <p>{all.department}</p>
            </div>
        ))
       }
        </>
    );
}