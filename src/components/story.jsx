import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../read/read.css';

export function Story() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [username, setUsername] = useState('Guest');
  const [postToCommunity, setPostToCommunity] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || 'Guest');
        }
      } 
      catch {
        setUsername('Guest');
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchStoryData() {
      if (!id) {
        return
      };

      try {
        const resStory = await fetch(`/api/stories/${id}`);
        if (resStory.ok) {
          const storyData = await resStory.json();
          setStory(storyData);
          setPostToCommunity(Boolean(storyData.postToCommunity));
        }
        const resFavs = await fetch('/api/favorites');
        if (resFavs.ok) {
          const favData = await resFavs.json();
          const isFav = favData.some(s => s.id === Number(id));
          setIsFavorite(isFav);
        }
      } catch (err) {
        console.error('Error loading story data:', err);
      }
    }
    fetchStoryData();
  }, [id]);

  const handleCommunityToggle = async (checked) => {
    setPostToCommunity(checked);
    try {
      const res = await fetch(`/api/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postToCommunity: checked }),
      });
      if (!res.ok) {
        setPostToCommunity(!checked);
        console.error('Failed to update community status:', res.status);
      }
    } 
    catch (err) {
      console.error('Error toggling community status:', err);
      setPostToCommunity(!checked);
    }
  };

  const handleFavoriteToggle = async (checked) => {
    setIsFavorite(checked);
    try {
      const method = checked ? 'POST' : 'DELETE';
      const res = await fetch(`/api/favorites/${id}`, { method });
      if (!res.ok) {
        setIsFavorite(!checked);
        console.error('Failed to update favorites:', res.status);
      }
    } 
    catch (err) {
      console.error('Error toggling favorite:', err);
      setIsFavorite(!checked);
    }
  };
  if (!story) {
    return (
      <main id="read-page">
        <p>Loading story...</p>
      </main>
    );
  }

  return (
    <main id="read-page">
      <header id="page-guidance">
        <br />
        <h1 id="mad-libs-title">Mad Libs©</h1>
        <Button className="buttons" onClick={() => navigate('/createstory')}>Create Story</Button>
        <Button className="buttons" onClick={() => navigate('/mystories')}>My Stories</Button>
        <Button className="buttons" onClick={() => navigate('/communityboard')}>Community Board</Button>
        <Button className="buttons" onClick={() => navigate('/about')}>About</Button>
        <hr />
      </header>

      <section id="story">
        <header id="storyTitle"><b><u>{story.title}</u></b></header>
        <p id="username"><i>by {story.author}</i></p>
        <p id="storyContent">{story.content}</p>

        <div id="checkbox-area">
          {username.toLowerCase() === (story.author || '').toLowerCase() && (
            <>
              <label htmlFor="checkbox1">Post to Community Board?</label>
              <input
                type="checkbox"
                id="checkbox1"
                checked={postToCommunity}
                onChange={(e) => handleCommunityToggle(e.target.checked)}
              />
              <span> | </span>
            </>
          )}

          <label htmlFor="checkbox2">Save Story to Favorites?</label>
          <input
            type="checkbox"
            id="checkbox2"
            checked={isFavorite}
            onChange={(e) => handleFavoriteToggle(e.target.checked)}
          />
        </div>
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
