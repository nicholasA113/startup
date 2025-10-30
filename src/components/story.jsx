import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../read/read.css';

export function Story() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username || 'Guest';
  const selectedStory = JSON.parse(localStorage.getItem('selectedReadStory'));

  const [postToCommunity, setPostToCommunity] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!selectedStory) {
    return <p>No story selected</p>;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const resStories = await fetch('/api/stories');
        if (resStories.ok) {
          const communityStories = await resStories.json();
          const isOnCommunity = communityStories.some(story => story.id === selectedStory.id);
          setPostToCommunity(isOnCommunity);
        }

        const resFavorites = await fetch('/api/favorites');
        if (resFavorites.ok) {
          const favoriteStories = await resFavorites.json();
          setIsFavorite(favoriteStories.some(story => story.id === selectedStory.id));
        }
      } catch (err) {
        console.error('Error loading story states:', err);
      }
    }

    fetchData();
  }, [selectedStory.id]);

  const handleCommunityToggle = async (checked) => {
    setPostToCommunity(checked);
    try {
      if (checked) {
        selectedStory.postToCommunity = true;
      } else {
        selectedStory.postToCommunity = false;
      }
      localStorage.setItem('selectedReadStory', JSON.stringify(selectedStory));
    } catch (err) {
      console.error('Error updating community status:', err);
    }
  };

  const handleFavoriteToggle = async (checked) => {
    setIsFavorite(checked);
    try {
      await fetch(`/api/favorites/${selectedStory.id}`, { method: 'POST' });
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

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
        <header id="storyTitle"><b><u>{selectedStory.title}</u></b></header>
        <p id="username"><i>by {selectedStory.author}</i></p>
        <p id="storyContent">{selectedStory.content}</p>

        <div id="checkbox-area">
          {username.toLowerCase() === selectedStory.author?.toLowerCase() && (
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
        <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
      </footer>
    </main>
  );
}