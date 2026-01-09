import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignInPage.css'
export default function SignInPage({setUserData}){
    const navigate=useNavigate();
    const [gmail,setGmail]=useState("");
    const [password,setPassword]=useState("");
    const handle=async(e)=>{
        e.preventDefault();
        const send={gmail,password};
        try{
        const response=await axios.post("https://library-management-system-backend-nleu.onrender.com/api/all/getSignIn",send,{withCredentials:true});
        if(response.data.message==="Login Successfully"){
            const user=response.data.data;
             setUserData(response.data.data);
            if(user.role=== 'Student'){
    try{
const response=await axios.get('https://library-management-system-backend-nleu.onrender.com/api/student/checkStudent',{withCredentials:true});
if(response.data.message=== 'user Exist'){
    navigate('/StudentPage');
}
    }catch(err){
        if(err.response?.data?.message=== 'please do a signUpFirst'){
            alert('please do a signUp first');
            navigate('/');
        }else if(err.response?.data?.message=== 'user not found'){
            navigate('/StudentMakePage');
        }
    }
            }
        }
    }catch(err){
        if(err.response?.data?.message==="Something went Wrong"){
            alert('please do signUp first');
            navigate('/');
        }else if(err.response?.data?.message==="Something went wrong"){
            alert('enter correct password');
        }
    }
}
    return(
        <>
         <div className="signin-page-container">
            <div className="signin-form-wrapper">
         <h1>Welcome to Login Page</h1>
         <form onSubmit={handle} className="signin-form">
            <input type="email" placeholder="Enter your gmail here"  onChange={(e)=>setGmail(e.target.value)} />
            <input type="password" placeholder='Enter your password here' onChange={(e)=>setPassword(e.target.value)} />
            <input type="submit" />
         </form>
         <p>dont have an account go to <Link to='/' >SignUpPage</Link></p>
         </div>
         </div>
        </>
    );
}