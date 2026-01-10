import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import './DepartmentPagecse.css';
export default function DepartmentPagecse(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
try{
    const response=await axios.get('https://library-management-system-backend-nleu.onrender.com/api/admin/getCse',{withCredentials:true});
    if(response.data.message=== 'foundbooks'){
        setData(response.data.data);
    }
}catch(err){
    if(err.response?.data?.message=== 'no books found'){
        alert('no books found');
    }
}
        };
        fetch();
    },[]);   

    const handleDelete=async(id)=>{
        const send={id};
        try{
const response=await axios.post('https://library-management-system-backend-nleu.onrender.com/api/admin/handleDelete',send,{withCredentials:true});
if(response.data.message=== 'book deleted successfully'){
    alert('bookDeleted');
}
        }catch(err){
            if(err.response?.data?.message=== 'error'){
                alert('something went wrong');
            }
        }
    }
    return(
        <>
          <div className="cse-page">
        <h1 className="cse-title">This are all the book of CSE Department</h1>

        {
            data.map((all,index)=>(
                <div  className="cse-card" key={index}>
                    <p>{all.bookName}</p>
                    <p>{all.author}</p>
                    <p>{all.isbn}</p>
                    <p>{all.department}</p>
                    <p>{all.quantity}</p>
                      <div className="cse-actions">
                    <button onClick={()=>handleDelete(all._id)}>delete</button>
                    <button>Update</button>
                    </div>
                </div>
            ))
        }
          </div>
        </>
    );
}