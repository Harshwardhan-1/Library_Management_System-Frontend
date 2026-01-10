import { useState,useEffect } from "react";
import axios from 'axios';
import './StudentPage.css';
export default function StudentPage(){
const [data,setData]=useState([]);
const [books,setBooks]=useState([]);
const [search,setSearch]=useState('');
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
    const filterIt=books.filter((book)=>
        book.author.toLowerCase().includes(search.toLowerCase())||
        book.bookName.toLowerCase().includes(search.toLowerCase())
    );


    const handleIssue=async(author,department,quantity)=>{
        const send={author,department,quantity};
    try{
const response=await axios.post('https://library-management-system-backend-nleu.onrender.com/api/issue/bookIssue',send,{withCredentials:true});
if(response.data.message=== 'user request send for bookIssue'){
    alert('book issued request send successfully');
}
    }catch(err){
        if(err.response?.data.message=== 'provide proper details'){
            alert('provide proper detail');
        }else if(err.response?.data?.message=== 'you already send request for this book'){
            alert('you already send request for this book');
        }else if(err.response?.data?.message=== 'you have already send 3 book issue request'){
            alert('you have already send 3 book issue request');
        }else if(err.response?.data?.message=== 'user not found'){
            alert('user not found');
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
   <input type="text" placeholder="Search By Author or BookName" onChange={(e)=>setSearch(e.target.value)}/>
    <div className="books-wrapper">
         
          {
                filterIt.length===0  && (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                    No user found
                </p>
                )
            }
       {
        filterIt.map((all,index)=>(
            <div className="book-card" key={index}>
      <p><span>ISBN:</span> {all.isbn}</p>
      <p><span>Book:</span> {all.bookName}</p>
      <p><span>Author:</span> {all.author}</p>
      <p><span>Dept:</span> {all.department}</p>
      <p><span>Quantity:</span>{all.quantity}</p>
      <button onClick={()=>handleIssue(all.author,all.department,all.quantity)}>Issue</button>
    </div>
        ))
       }
       </div>
        </>
    );
}