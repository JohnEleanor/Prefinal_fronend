import  {  BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Protect from './pages/Protect';
import Home from './pages/Home';
import Logout from './pages/Logout';
import User from './pages/User'


export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} path='/'></Route>
        <Route element={<Register/>} path='/register'></Route>
        <Route element={<Logout/>} path='/logout'></Route>

        {/* Protect */}
        <Route element={ <Protect/> }>
          <Route element={<Home/>} path='/home'></Route>
          <Route element={<User/>} path='/user'></Route>
        </Route>
        {/* Protect */}
      </Routes>
      
    </BrowserRouter>
    
    </>
  )
}

