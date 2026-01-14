import {Routes,Route} from 'react-router-dom';
import SignUpPage from "./components/SignUpPage"
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';
import OtpVerify from './components/OtpVerify';
import NewPassword from './components/NewPassword';
import StudentMakePage from './components/StudentMakePage';
import StudentPage from './components/StudentPage';
import AdminPage from './components/AdminPage';
import DepartmentPagecse from './components/DepartmentPagecse';
import DepartmentPageece from './components/DepartmentPageece';
import RequestPage from './components/RequestPage';
import AdminApproved from './components/AdminApproved';
import {useState} from 'react';
import {useEffect} from 'react';
import FinePage from './components/FinePage';
import axios from 'axios';
function App() {
  useEffect(()=>{
    const UpBackend=async()=>{
      try{
        const response=await axios.get('https://library-management-system-backend-1-i28x.onrender.com',{withCredentials:true});
        console.log(response.data);
      }catch(err){
        if(err.response){
          alert(err.response.data.message || "Invalid email or passowrd");
        }else{
          alert('Server went down');
        }
      }
    }
    UpBackend();
  },[]);
  const [userData,setUserData]=useState(null);
  const [passwordData,setPasswordData]=useState(null);   
  return (
    <>
    <Routes>
      <Route path='/' element={<SignUpPage />}></Route>
      <Route path='/signIn' element={<SignInPage setUserData={setUserData} />}></Route>
      <Route path='/HomePage' element={<HomePage userData={userData}/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword setPasswordData={setPasswordData}/>}></Route>
      <Route path='/OtpVerify' element={<OtpVerify passwordData={passwordData} /> }></Route>
      <Route path='/NewPassword' element={<NewPassword />}></Route>
      <Route path='/StudentMakePage' element={<StudentMakePage />}></Route>
      <Route path='/StudentPage' element={<StudentPage />}></Route>
      <Route path='/AdminPage' element={<AdminPage />}></Route>
      <Route path='/DepartmentPagecse' element={<DepartmentPagecse />} ></Route>
      <Route path='/DepartmentPageece' element={<DepartmentPageece />}></Route>
      <Route path='/RequestPage' element={<RequestPage />}></Route>
      <Route path='/AdminApproved' element={<AdminApproved />}></Route>
      <Route path='/FinePage' element={<FinePage />}></Route>
    </Routes>
    </>
  )
}

export default App