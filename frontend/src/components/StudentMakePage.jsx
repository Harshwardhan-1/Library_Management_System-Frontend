import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './StudentMakePage.css';
export default function StudentMakePage(){
    const navigate=useNavigate();
    const [rollNo,setRollNo]=useState('');
    const [department,setDepartment]=useState('');
    const [section,setSection]=useState('');
    const [phoneNo,setPhoneNo]=useState('');
    

     const handle=async(e)=>{
        e.preventDefault();
        const send={rollNo,department,section,phoneNo};
        try{
const response=await axios.post('https://library-management-system-backend-nleu.onrender.com/api/student/makeStudent',send,{withCredentials:true});
if(response.data.message=== 'user created successfully'){
    navigate('/StudentPage');
}
     }catch(err){
        if(err.response?.data?.message=== 'fill details properly'){
            alert('fill details properly');
        }else if(err.response?.data?.message=== 'rollNo must be of 3 characters'){
            alert('rollNo must be of 3 characters');
        }
     }
    }
        return(
        <>
        <h1 className="make-title">This is Student Make Page</h1>
        <form className="make-form"  onSubmit={handle}>
    <input type="text" placeholder="Enter your rollNo here" onChange={(e)=>setRollNo(e.target.value)} />
    <input type="text" placeholder="Enter your department here CSE/ECE" onChange={(e)=>setDepartment(e.target.value)} />
    <input type="text" placeholder="Enter your section here" onChange={(e)=>setSection(e.target.value)}/>
    <input type="text" placeholder="Enter your phoneNo" onChange={(e)=>setPhoneNo(e.target.value)} />
    <button type="submit">Submit</button>
        </form>
        </>
    );
}