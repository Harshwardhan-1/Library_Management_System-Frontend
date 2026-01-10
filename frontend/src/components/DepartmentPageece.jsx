import {useState,useEffect} from 'react';
import axios from 'axios';
import './DepartmentPageece.css'
export default function DepartmentPageece(){
     const [data,setData]=useState([]);
     const [search,setSearch]=useState("");
     useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://library-management-system-backend-nleu.onrender.com/api/admin/getEce',{withCredentials:true});
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


     const filterIt=data.filter((user)=>
        user.author.toLowerCase().includes(search.toLowerCase())||
     user.isbn.toLowerCase().includes(search.toLowerCase())
    );
    return(
        <>
            <div className="cse-page">
        <h1>This are all the book of ECE Department</h1>
        <input type="text"   className="cse-search" placeholder='Search by author or isbnId' onChange={(e)=>setSearch(e.target.value)} />
        
          {        
                filterIt.length===0  && (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                    No user found
                </p>
                )
          }
          
        {
            filterIt.map((all,index)=>(
                <div className="cse-card" key={index}>
                    <p>{all.bookName}</p>
                    <p>{all.author}</p>
                    <p>{all.isbn}</p>
                    <p>{all.department}</p>
                    <p>{all.quantity}</p> 
                     <div className="cse-actions">
                    <button>Delete</button>
                    <button>Update</button>
                    </div>
                </div>
            ))
        }
        </div>
        </>
    );
}