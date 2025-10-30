import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../communityboard/communityboard.css';

export function MyStories() {
  const navigate = useNavigate();
  const [myStories, setMyStories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const resStories = await fetch('/api/mystories');
        if (resStories.ok) setMyStories(await resStories.json());

        const resFavs = await fetch('/api/favorites');
        if (resFavs.ok) setFavorites(await resFavs.json());
      } catch (err) {
        console.error('Error loading stories:', err);
      }
    };
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
        <header id="page-title"><b><u>My Stories</u></b></header>
        <p><u>{user.username}'s Stories</u></p>

        {myStories.length > 0 ? (
          myStories.map((story) => (
            <div
              key={story.id}
              className="story-card"
              onClick={() => {
                localStorage.setItem('selectedReadStory', JSON.stringify(story));
                navigate('/story');
              }}
            >
              <h3>{story.title}</h3>
            </div>
          ))
        ) : (
          <p>No stories created yet.</p>
        )}

        <br />
        <p><u>Favorited Stories</u></p>

        {favorites.length > 0 ? (
          favorites.map((story) => (
            <div
              key={story.id}
              className="story-card"
              onClick={() => {
                localStorage.setItem('selectedReadStory', JSON.stringify(story));
                navigate('/story');
              }}
            >
              <h3>{story.title}</h3>
              <p><i>by {story.author}</i></p>
            </div>
          ))
        ) : (
          <p>No favorite stories yet.</p>
        )}
      </section>

      <footer className="footer">
        <hr />
        <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
      </footer>
    </main>
  );
}