import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './AdminPage.css';
export default function AdminPage(){
    const navigate=useNavigate();
    const [bookName,setBookName]=useState('');
    const [author,setAuthor]=useState('');
    const[isbn,setIsbn]=useState('');
    const [department,setDepartment]=useState('');
    const [quantity,setQuantity]=useState(0);


    const handle=async(e)=>{
        e.preventDefault();
    const send={bookName,author,isbn,department,quantity};
    try{
const response=await axios.post("https://library-management-system-backend-1-i28x.onrender.com/api/admin/addBook",send,{withCredentials:true});
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
        }else if(err.response?.data?.message=== 'Id must have atleast 3 characters'){
            alert('id must have at least 3 characters');
        }else if(err.response?.data?.message=== 'quantity must be atleast 1'){
            alert('quantity must be atleast 1');
        }
    }
    }
    const handleCseBook=()=>{
        navigate('/DepartmentPagecse');
    }
    const handleEceBook=()=>{
        navigate('/DepartmentPageece');
    }


    const handleIssue=()=>{
        navigate('/RequestPage');
    }
    return(
        <>
         <div className="admin-page">
        <h1 className="admin-title">Hii i am the admin of this website Library Managenent System Harshwardhan Yadav</h1>
        <form className="admin-form" onSubmit={handle}>
<input type="text" placeholder="Enter your book name here" onChange={(e)=>setBookName(e.target.value)} />
<input type="text" placeholder="Enter book author here" onChange={(e)=>setAuthor(e.target.value)} />
<input type="text" placeholder="Enter your book Id here" onChange={(e)=>setIsbn(e.target.value)} />
<input type="text" placeholder="Enter book department here" onChange={(e)=>setDepartment(e.target.value)} />
<input type="number" placeholder="Enter book quantity here" onChange={(e)=>setQuantity(e.target.value)} />
<button type="submit" className="submit-btn">Submit</button>
        </form>

 <div className="dept-buttons">
        <button onClick={handleCseBook}>See all book of CSE Department</button>
        <button onClick={handleEceBook}>See all book ECE Department </button>
        <button>See all book Civil Department</button>
        <button>See all book of Mechanical Department</button>
        </div>
        </div>



        <button className="issue-btn" onClick={handleIssue}>Accept Issue Request Of User</button>
        </>
    );
}