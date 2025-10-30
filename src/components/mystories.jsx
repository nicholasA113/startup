import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../communityboard/communityboard.css';

export function MyStories() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username || 'Guest';

  const [myStories, setMyStories] = useState([]);

  useEffect(() => {
    async function fetchMyStories() {
      try {
        const res = await fetch('/api/mystories');
        if (!res.ok) throw new Error('Failed to load your stories');

        const stories = await res.json();
        setMyStories(stories);
        localStorage.setItem('myStories', JSON.stringify(stories));
      } catch (err) {
        console.error('Error loading stories:', err);
        const storedStories = JSON.parse(localStorage.getItem('myStories')) || [];
        setMyStories(storedStories);
      }
    }

    fetchMyStories();
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
        <header id="page-title">
          <u><b>{username}’s Stories</b></u>
        </header>
        <br />
        {myStories.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>
            You haven’t created any stories yet.
          </p>
        ) : (
          myStories.map((story) => (
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
