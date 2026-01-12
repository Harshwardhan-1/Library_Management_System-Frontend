import { useState,useEffect } from "react";
import axios from "axios";
export default function FinePage(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get("https://library-management-system-backend-nleu.onrender.com/api/fine/allFine",{withCredentials:true});
setData(response.data.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch();
    },[]);
    return(
        <>
        <h1>This is the page of Fine Student</h1>

        {
            data.map((all,index)=>(
                <div key={index}>
                    <p>{all?.name}</p>
                    <p>{all?.gmail}</p>
                    <p>{all?.isbn}</p>
                    <p>{all?.author}</p>
                 <p><strong>Fine Date:{new Date(all.date).toLocaleDateString()} </strong></p>
                </div>
            ))
        }
        </>
    );
}