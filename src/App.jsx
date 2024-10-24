import  { Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Protect from './pages/Protect';
import Home from './pages/Home';
import Logout from './pages/Logout';
import User from './pages/User'
import Edit from './pages/Edit'


export default function App() {

  return (
    <>
    
      <Routes>
        <Route element={<Login/>} path='/'></Route>
        <Route element={<Register/>} path='/register'></Route>
        <Route element={<Logout/>} path='/logout'></Route>

        {/* Protect */}
        <Route element={ <Protect/> }>
          <Route element={<Home/>} path='/home'></Route>
          <Route element={<User/>} path='/user'></Route>
          <Route element={<Edit/>} path='/edit/:id'></Route>
        </Route>
        {/* Protect */}
      </Routes>
    
    </>
  )
}

