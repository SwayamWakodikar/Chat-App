import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import Profilepage from './pages/Profilepage';

function App() {

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile' element={<Profilepage/>}/>

      </Routes>
    </div>
  );
}
export default App
