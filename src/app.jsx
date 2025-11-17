import React, { useEffect, useState } from 'react';
import { Login } from './login/login';
import { CreateStory } from './createstory/createstory';
import { About } from './about/about';
import { Write } from './write/write';
import { Read } from './read/read';
import { MyStories } from './components/mystories';
import { Story } from './components/story';
import { CommunityBoard } from './communityboard/communityboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const [wsMessage, setWsMessage] = useState(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'broadcast') {
          setWsMessage(data.message);
          setTimeout(() => setWsMessage(null), 5000);
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    };
    ws.onopen = () => console.log("WebSocket connected");
    ws.onclose = () => console.log("WebSocket disconnected");
    return () => ws.close();
  }, []);

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

      {wsMessage && (
        <div style={styles.bottomMessage}>
          {wsMessage}
        </div>
      )}
    </BrowserRouter>
  );
}

const styles = {
  bottomMessage: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#4a90e2',
    padding: '12px 20px',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    zIndex: 9999,
    boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease-in-out',
  },
};
