import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about'
import CommunityBoard from './components/communityboard'
import CreateStory from './components/createstory'
import Index from './components/index'
import MyStories from './components/mystories'
import Read from './components/read'
import Story from './components/story'
import Write from './components/write'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/createstory" element={<CreateStory />} />
        <Route path="/mystories" element={<MyStories />} />
        <Route path="/story" element={<Story />} />
        <Route path="/communityboard" element={<CommunityBoard />} />
        <Route path="/about" element={<About />} />
        <Route path="/read" element={<Read />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </Router>
  );
}

export default App
