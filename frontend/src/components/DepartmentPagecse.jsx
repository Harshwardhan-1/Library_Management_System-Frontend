import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import './DepartmentPagecse.css';
export default function DepartmentPagecse(){
    const [data,setData]=useState([]);
    const [search,setSearch]=useState('');
        const fetch=async()=>{
try{
    const response=await axios.get('https://library-management-system-backend-1-i28x.onrender.com/api/admin/getCse',{withCredentials:true});
    if(response.data.message=== 'foundbooks'){
        setData(response.data.data);
    }
}catch(err){
    if(err.response?.data?.message=== 'no books found'){
        alert('no books found');
    }
}
        };
        useEffect(()=>{
           fetch();   
        });
    const handleDelete=async(id)=>{
        const send={id};
        try{
const response=await axios.post('https://library-management-system-backend-1-i28x.onrender.com/api/admin/handleDelete',send,{withCredentials:true});
if(response.data.message=== 'book deleted successfully'){
    alert('bookDeleted');
}
        }catch(err){
            if(err.response?.data?.message=== 'error'){
                alert('something went wrong');
            }   
        }
    }

    const filterIt=data.filter((book)=>
        book.author.toLowerCase().includes(search.toLowerCase())||
        book.isbn.toLowerCase().includes(search.toLowerCase())
    );
    
    return(
        <>
          <div className="cse-page">
        <h1 className="cse-title">This are all the book of CSE Department</h1>
<input type="text"   className="cse-search" placeholder="Search by author name or isbn/Book Id" onChange={(e)=>setSearch(e.target.value)} />
          
          {
                filterIt.length===0  && (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                    No user found
                </p>
                )
            }

        {
            filterIt.map((all,index)=>(
                <div  className="cse-card" key={index}>
                    <p>{all.bookName}</p>
                    <p>{all.author}</p>
                    <p>{all.isbn}</p>
                    <p>{all.department}</p>
                    <p>{all.quantity}</p>
                      <div className="cse-actions">
                    <button onClick={()=>handleDelete(all._id)}>delete</button>
                    </div>
                </div>
            ))
        }
          </div>
        </>
    );
}