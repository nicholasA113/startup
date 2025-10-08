import React from 'react';
import { Login } from './login/login';
import { CreateStory } from './createstory/createstory';
import { About } from './about/about';
import { Write } from './write/write';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createstory' element={<CreateStory />} />
        <Route path='/about' element={<About />} />
        <Route path='/write' element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}
