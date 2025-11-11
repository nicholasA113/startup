import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../communityboard/communityboard.css';

export function MyStories() {
  const navigate = useNavigate();
  const [myStories, setMyStories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserAndStories = async () => {
      try {
        const userRes = await fetch('/api/user', { credentials: 'include' });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUsername(userData.username);
          localStorage.setItem('user', JSON.stringify(userData));
        } 
        else if (userRes.status === 401) {
          setError('You must be logged in to view your stories.');
          return;
        }

        const resStories = await fetch('/api/mystories', { credentials: 'include' });
        if (resStories.status === 401) {
          setError('You must be logged in to view your stories.');
          return;
        }
        if (!resStories.ok) {
          throw new Error('Failed to load your stories');
        }
        const storiesData = await resStories.json();
        setMyStories(storiesData);

        const resFavs = await fetch('/api/favorites', { credentials: 'include' });
        if (resFavs.ok) {
          const favData = await resFavs.json();
          setFavorites(Array.isArray(favData) ? favData : favData.favorites || []);
        }
      } 
      catch (err) {
        console.error('Error loading stories:', err);
        setError('Could not load stories.');
      }
    };
    fetchUserAndStories();
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
        <header id="page-title"><b><u>My Stories</u></b></header>

        {error && <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>}

        {!error && (
          <>
            <p><u>{username ? `${username}’s Stories` : 'My Stories'}</u></p>
            {myStories.length > 0 ? (
              myStories.map((story) => (
                <Button
                  key={story.id}
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
            ) : (
              <p>No stories created yet.</p>
            )}

            <br />
            <p><u>Favorited Stories</u></p>

            {favorites.length > 0 ? (
              favorites.map((story) => (
                <Button
                  key={story.id}
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
            ) : (
              <p>No favorite stories yet.</p>
            )}
          </>
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
