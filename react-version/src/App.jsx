import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import about from './components/about'
import communityboard from './components/communityboard'
import createstory from './components/createstory'
import index from './components/index'
import mystories from './components/mystories'
import read from './components/read'
import story from './components/story'
import write from './components/write'
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <route path="/" element={<index />} />
        <route path="/createstory" element={<createstory />} />
        <route path="/mystories" element={<mystories />} />
        <route path="/story" element={<story />} />
        <route path="/communityboard" element={<communityboard />} />
        <route path="/about" element={<about />} />
      </Routes>
    </Router>
  );
}

export default App
