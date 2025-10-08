import React from 'react';
import { Login } from './login/login';
import { CreateStory } from './createstory/createstory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createstory' element={<CreateStory />} />
      </Routes>
    </BrowserRouter>
  );
}
