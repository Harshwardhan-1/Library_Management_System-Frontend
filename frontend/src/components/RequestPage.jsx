import {useState,useEffect} from 'react';
import axios from 'axios';
export default function RequestPage(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://library-management-system-backend-nleu.onrender.com/api/issue/allRequest',{withCredentials:true});
if(response.data.message=== 'here are all the issue request'){
    setData(response.data.data);
}
            }catch(err){
                if(err.response?.data?.message=== 'no issue yet'){
                    alert('no issue yet');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
        <h1>This are the book issue request grant them if you want</h1>
        {
            data.map((all,index)=>{
                <div key={index}>
                    <p>Name Of Student:{data?.name}</p>
                    <p>Gmail Of Gmail:{data?.gmail}</p>
                    <p>Author Of Book:{data?.author}</p>
                    <p>Department Of Student:{data?.department}</p>
                    <p>Quantity left:{data?.quantity}</p>
                </div>
            })
        }
        </>
    );
}