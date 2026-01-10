import { useState } from "react";
import axios from 'axios';
export default function AdminPage(){
    const [bookName,setBookName]=useState('');
    const [author,setAuthor]=useState('');
    const[isbn,setIsbn]=useState('');
    const [department,setDepartment]=useState('');
    const [quantity,setQuantity]=useState('');
    const handle=async(e)=>{
        e.preventDefault();
    const send={bookName,author,isbn,department,quantity};
    try{
const response=await axios.post("https://library-management-system-backend-nleu.onrender.com/api/admin/addBook",send,{withCredentials:true});
if(response.data.message=== 'book added successfully'){
    alert('book successfully added');
}
    }catch(err){
        if(err.response?.data?.message=== 'fill proper detail'){
            alert('fill details properly');
        }else if(err.response?.data?.message=== 'you can increase quantity if available'){
            alert('you can increase quantity if available');
        }else if(err.response?.data?.message=== 'already exist increase quantity if available'){
            alert('same book with same author exist you can increase quantity');
        }
    }
    }
    return(
        <>
        <h1>Hii i am the admin of this website library managenent system</h1>
        <form onSubmit={handle}>
<input type="text" placeholder="Enter your book name here" onChange={(e)=>setBookName(e.target.value)} />
<input type="text" placeholder="Enter book author here" onChange={(e)=>setAuthor(e.target.value)} />
<input type="text" placeholder="Enter your book Id here" onChange={(e)=>setIsbn(e.target.value)} />
<input type="text" placeholder="Enter book department here" onChange={(e)=>setDepartment(e.target.value)} />
<input type="text" placeholder="Enter book quantity here" onChange={(e)=>setQuantity(e.target.value)} />
<button type="submit">Submit</button>
        </form>
        </>
    );
}