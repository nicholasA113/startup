import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './communityboard.css';

export function CommunityBoard() {
  const navigate = useNavigate();
  const [communityBoardStories, setCommunityBoardStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/api/stories');
        if (!response.ok) throw new Error('Failed to load stories');

        const stories = await response.json();
        setCommunityBoardStories(stories);
        localStorage.setItem('communityBoardStories', JSON.stringify(stories));
      } catch (err) {
        console.error('Error loading community board stories:', err);
        const storedStories = JSON.parse(localStorage.getItem('communityBoardStories')) || [];
        setCommunityBoardStories(storedStories);
      }
    }

    fetchStories();
  }, []);

  return (
    <main id="main-page">
      <header id="page-guidance">
        <br />
        <h1 id="mad-libs-title">Mad Libs©</h1>
        <Button className="buttons" onClick={() => navigate('/createstory')}>Create Story</Button>
        <Button className="buttons" onClick={() => navigate('/mystories')}>My Stories</Button>
        <Button className="buttons" onClick={() => navigate('/communityboard')}>Community Board</Button>
        <Button className="buttons" onClick={() => navigate('/about')}>About</Button>
        <hr />
      </header>

      <section id="sections-page">
        <header id="page-title"><u><b>Community Board</b></u></header>
        <br />
        {communityBoardStories.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>No stories added to community board yet.</p>
        ) : (
          communityBoardStories.map((story) => (
            <Button
              key={story.id || story.content}
              className="story-card"
              onClick={() => {
                localStorage.setItem('selectedReadStory', JSON.stringify(story));
                navigate('/story');
              }}
            >
              <b>{story.title}</b>
              <br />
              <i>by {story.author}</i>
            </Button>
          ))
        )}
      </section>

      <footer className="footer">
        <hr />
        <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">
          Github
        </NavLink>
      </footer>
    </main>
  );
}
