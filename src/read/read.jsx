import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './read.css';

export function Read() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username || 'Guest';

  const selectedReadStory = JSON.parse(localStorage.getItem('selectedReadStory'));
  const storyTemplate = localStorage.getItem('storyTemplate');
  const filledWords = JSON.parse(localStorage.getItem('filledWords'));
  const storyTitle = localStorage.getItem('storyTitle');

  const [postToCommunity, setPostToCommunity] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const fullStory = storyTemplate
    ? storyTemplate.replace(/{{(\d+)}}/g, (_, i) => filledWords[i - 1])
    : selectedReadStory?.content || '';

  const title = storyTemplate ? storyTitle : selectedReadStory?.title;
  const author = storyTemplate ? username : selectedReadStory?.author;

  const currentStory = { title, content: fullStory, author, postToCommunity };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (!res.ok) return;
        const favs = await res.json();
        const found = favs.some((s) => s.content === currentStory.content);
        setIsFavorited(found);
      } 
      catch (err) {
        console.error('Error checking favorites:', err);
      }
    };
    checkFavorite();
  }, [currentStory.content]);

  const handleSaveStory = async () => {
    try {
      const saveRes = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentStory),
      });

      if (!saveRes.ok) {
        throw new Error('Failed to save story')
      };
      const savedStory = await saveRes.json();

      if (isFavorited) {
        await fetch(`/api/favorites/${savedStory.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      }
      navigate('/mystories');
    } 
    catch (err) {
      console.error('Error saving story:', err);
    }
  };

  const handleDeleteStory = () => {
    navigate('/createstory');
  };

  const handleCreateAnother = async () => {
    try {
      await handleSaveStory();
      navigate('/createstory');
    } catch {
      navigate('/createstory');
    }
  };

  const toggleFavorite = async (checked) => {
    setIsFavorited(checked);
    try {
      if (selectedReadStory && selectedReadStory.id) {
        await fetch(`/api/favorites/${selectedReadStory.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } 
    catch (err) {
      console.error('Error updating favorite:', err);
    }
  };

  return (
    <main id="read-page">
      <header id="page-guidance">
        <br />
        <h1 id="mad-libs-title">Mad Libs©</h1>
        <Button className="buttons" onClick={() => navigate('/createstory')}>
          Create Story
        </Button>
        <Button className="buttons" onClick={() => navigate('/mystories')}>
          My Stories
        </Button>
        <Button className="buttons" onClick={() => navigate('/communityboard')}>
          Community Board
        </Button>
        <Button className="buttons" onClick={() => navigate('/about')}>
          About
        </Button>
        <hr />
      </header>

      <section id="story">
        <header id="storyTitle">
          <b><u>{title}</u></b>
        </header>
        <p id="username"><i>by {author}</i></p>
        <p id="storyContent">{fullStory}</p>

        <div id="checkbox-area">
          {username === author && (
            <>
              <label htmlFor="checkbox1">Post to Community Board?</label>
              <input
                type="checkbox"
                id="checkbox1"
                checked={postToCommunity}
                onChange={(e) => setPostToCommunity(e.target.checked)}
              />
              <span> | </span>
            </>
          )}
          <label htmlFor="checkbox2">Save Story to Favorites?</label>
          <input
            type="checkbox"
            id="checkbox2"
            checked={isFavorited}
            onChange={(e) => toggleFavorite(e.target.checked)}
          />
        </div>

        <br />
        <div id="next-step-buttons">
          <Button className="buttons" onClick={handleSaveStory}>Save Story</Button>
          <Button className="buttons" onClick={handleDeleteStory}>Delete Story</Button>
          <Button className="buttons" onClick={handleCreateAnother}>Create Another Story</Button>
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