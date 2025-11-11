import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../read/read.css';

export function Story() {
  const navigate = useNavigate();

  const storedUser =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('tempUser')) ||
    { username: 'Guest' };
  const username = storedUser.username;

  const raw = localStorage.getItem('selectedReadStory');
  const selectedStory = raw ? JSON.parse(raw) : null;

  const [postToCommunity, setPostToCommunity] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!selectedStory) {
    return <main id="read-page"><p>No story selected</p></main>;
  }

  useEffect(() => {
    let mounted = true;

    async function fetchState() {
      try {
        const resStories = await fetch('/api/stories', { credentials: 'include' });
        if (resStories.ok) {
          const communityStories = await resStories.json();
          if (!mounted) return;
          const onCommunity = selectedStory.id && communityStories.some(s => s.id === selectedStory.id);
          setPostToCommunity(Boolean(onCommunity));
        }

        const resFav = await fetch('/api/favorites', { credentials: 'include' });
        if (resFav.ok) {
          const favStories = await resFav.json();
          if (!mounted) return;
          const fav = selectedStory.id && favStories.some(s => s.id === selectedStory.id);
          setIsFavorite(Boolean(fav));
        } else if (resFav.status === 401) {
          setIsFavorite(false);
        }
      } catch (err) {
        console.error('Error fetching story state:', err);
      }
    }

    fetchState();
    return () => { mounted = false; };
  }, [selectedStory?.id]);

  const updateLocalSelectedStory = (storyObj) => {
    localStorage.setItem('selectedReadStory', JSON.stringify(storyObj));
  };

  const handleCommunityToggle = async (checked) => {
    const prev = postToCommunity;
    setPostToCommunity(checked);
    setLoading(true);

    try {
      if (selectedStory.id) {
        const res = await fetch(`/api/stories/${selectedStory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ postToCommunity: checked }),
        });

        if (!res.ok) {
          setPostToCommunity(prev);
          console.error('PUT /api/stories/:id failed:', res.status);
          alert('Could not update community status on the server.');
        } else {
          const updated = await res.json();
          updateLocalSelectedStory(updated);
        }
      } else {
        const res = await fetch('/api/stories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            title: selectedStory.title,
            content: selectedStory.content,
            postToCommunity: checked,
            author: selectedStory.author || username,
          }),
        });

        if (!res.ok) {
          setPostToCommunity(prev);
          alert('Could not post story to community board.');
        } else {
          const created = await res.json();
          updateLocalSelectedStory(created);
        }
      }
    } catch (err) {
      console.error('Error toggling community status:', err);
      setPostToCommunity(prev);
      alert('Network error toggling community status.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (checked) => {
    const prev = isFavorite;
    setIsFavorite(checked);
    setLoading(true);

    try {
      let storyId = selectedStory.id;

      if (!storyId) {
        const resCreate = await fetch('/api/stories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            title: selectedStory.title,
            content: selectedStory.content,
            postToCommunity: false,
            author: selectedStory.author || username,
          }),
        });

        if (!resCreate.ok) {
          setIsFavorite(prev);
          alert('Could not prepare story for favoriting.');
          setLoading(false);
          return;
        }

        const created = await resCreate.json();
        storyId = created.id;
        updateLocalSelectedStory(created);
      }

      const resFav = await fetch(`/api/favorites/${storyId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!resFav.ok) {
        setIsFavorite(prev);
        alert('Could not toggle favorite on server.');
      } else {
        setIsFavorite(!prev);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setIsFavorite(prev);
      alert('Network error toggling favorite.');
    } finally {
      setLoading(false);
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
          {username.toLowerCase() === (selectedStory.author || '').toLowerCase() && (
            <>
              <label htmlFor="checkbox1">Post to Community Board?</label>
              <input
                type="checkbox"
                id="checkbox1"
                checked={postToCommunity}
                onChange={(e) => handleCommunityToggle(e.target.checked)}
                disabled={loading}
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
            disabled={loading}
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
