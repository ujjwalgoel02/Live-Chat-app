import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Chat from './Pages/Chat/Chat'
import ProfileUpdte from './Pages/ProfileUpdate/ProfileUpdte'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AppContext } from './Context/AppContext'

const App = () => {

  const navigate = useNavigate();
  const {loadUserData} = useContext(AppContext); 

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        navigate('/chat')
        await loadUserData(user.uid)
      }
      else{
        navigate('/')
      }
    })
  },[])

  return (
    <div>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/profile' element={<ProfileUpdte/>}/>
        </Routes>
    </div>
  )
}

export default App