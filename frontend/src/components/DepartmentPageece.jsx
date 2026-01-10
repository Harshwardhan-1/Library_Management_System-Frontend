import {useState,useEffect} from 'react';
import axios from 'axios';
export default function DepartmentPageece(){
     const [data,setData]=useState([]);
     useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://library-management-system-backend-nleu.onrender.com/api/admin/checkece',{withCredentials:true});
if(response.data.message=== 'book found'){
    setData(response.data.data);
}
            }catch(err){
                if(err.response?.data?.message=== 'not found'){
                    alert('no record found');
                }
            }
        };
        fetch();
     },[]);
    return(
        <>
        <h1>This are all the book of ece</h1>
        {
            data.map((all,index)=>(
                <div key={index}>
                    <p>{all.bookName}</p>
                    <p>{all.author}</p>
                    <p>{all.isbn}</p>
                    <p>{all.department}</p>
                    <p>{all.quantity}</p> 
                </div>
            ))
        }
        </>
    );
}