import React from 'react';
import { Login } from './login/login';
import { CreateStory } from './createstory/createstory';
import { About } from './about/about';
import { Write } from './write/write';
import { Read } from './read/read';
import { MyStories } from './components/mystories';
import { Story } from './components/story';
import { CommunityBoard} from './communityboard/communityboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createstory' element={<CreateStory />} />
        <Route path='/about' element={<About />} />
        <Route path='/write' element={<Write />} />
        <Route path='/read' element={<Read />} />
        <Route path='/mystories' element={<MyStories />} />
        <Route path='/story' element={<Story />} />
        <Route path='/communityboard' element={<CommunityBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
