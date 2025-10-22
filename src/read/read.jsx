import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './read.css';

export function Read() {
  const navigate = useNavigate();
  const storedTempUser = JSON.parse(localStorage.getItem('tempUser'));

  const selectedReadStory = JSON.parse(localStorage.getItem('selectedReadStory'));
  const storyTemplate = localStorage.getItem('storyTemplate');
  const filledWords = JSON.parse(localStorage.getItem('filledWords'));
  const storyTitle = localStorage.getItem('storyTitle');

  const [postToCommunity, setPostToCommunity] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasSavedOrCreated, setHasSavedOrCreated] = useState(false);

  const fullStory = storyTemplate
    ? storyTemplate.replace(/{{(\d+)}}/g, (_, i) => filledWords[i - 1])
    : selectedReadStory?.content || '';

  const title = storyTemplate ? storyTitle : selectedReadStory?.title;
  const author = storyTemplate ? storedTempUser?.username : selectedReadStory?.author;
  const currentStory = { title, content: fullStory, author };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteStories')) || [];
    const isAlreadyFavorited = favorites.some(
      (story) => story.content === currentStory.content
    );
    setIsFavorited(isAlreadyFavorited);
  }, [currentStory.content]);

  useEffect(() => {
    if (!hasSavedOrCreated) return;

    let favorites = JSON.parse(localStorage.getItem('favoriteStories')) || [];

    if (isFavorited) {
      const exists = favorites.some(
        (story) => story.content === currentStory.content
      );
      if (!exists) favorites.push(currentStory);
    } else {
      favorites = favorites.filter(
        (story) => story.content !== currentStory.content
      );
    }

    localStorage.setItem('favoriteStories', JSON.stringify(favorites));
  }, [isFavorited, currentStory, hasSavedOrCreated]);

  const handleSaveStory = () => {
    const newStory = { title, content: fullStory, author: storedTempUser.username };

    const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
    savedStories.push(newStory);
    localStorage.setItem('savedStories', JSON.stringify(savedStories));

    if (postToCommunity) {
      const communityBoardStories =
        JSON.parse(localStorage.getItem('communityBoardStories')) || [];
      communityBoardStories.push(newStory);
      localStorage.setItem(
        'communityBoardStories',
        JSON.stringify(communityBoardStories)
      );
    }

    setHasSavedOrCreated(true);
    navigate('/mystories');
  };

  const handleCreateAnother = () => {
    const newStory = { title, content: fullStory, author: storedTempUser.username };

    const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
    savedStories.push(newStory);
    localStorage.setItem('savedStories', JSON.stringify(savedStories));

    if (postToCommunity) {
      const communityBoardStories =
        JSON.parse(localStorage.getItem('communityBoardStories')) || [];
      communityBoardStories.push(newStory);
      localStorage.setItem(
        'communityBoardStories',
        JSON.stringify(communityBoardStories)
      );
    }

    setHasSavedOrCreated(true);
    navigate('/createstory');
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
          <b>
            <u>{title}</u>
          </b>
        </header>
        <p id="username">
          <i>by {author}</i>
        </p>
        <p id="storyContent">{fullStory}</p>

        <div id="checkbox-area">
          {storedTempUser?.username === author && (
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
            onChange={(e) => setIsFavorited(e.target.checked)}
            disabled={!hasSavedOrCreated}
          />
        </div>

        <br />
        <div id="next-step-buttons">
          <Button className="buttons" onClick={handleSaveStory}>
            Save Story
          </Button>
          <Button className="buttons" onClick={() => navigate('/createstory')}>
            Delete Story
          </Button>
          <Button className="buttons" onClick={handleCreateAnother}>
            Create Another Story
          </Button>
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
