import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../read/read.css';

export function Story() {
  const navigate = useNavigate();
  const storedTempUser = JSON.parse(localStorage.getItem('tempUser')) || { username: 'Guest' };
  const username = storedTempUser.username;
  const selectedStory = JSON.parse(localStorage.getItem('selectedReadStory'));

  const [postToCommunity, setPostToCommunity] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!selectedStory) return <p>No story selected</p>;

  useEffect(() => {
    const communityBoardStories = JSON.parse(localStorage.getItem('communityBoardStories')) || [];
    const favoriteStories = JSON.parse(localStorage.getItem(`favoriteStories_${username}`)) || [];

    const isOnCommunityBoard = communityBoardStories.some(
      story => story.content === selectedStory.content
    );
    const isFavorited = favoriteStories.some(
      story => story.content === selectedStory.content
    );

    setPostToCommunity(isOnCommunityBoard);
    setIsFavorite(isFavorited);
  }, [selectedStory, username]);

  const handleCommunityToggle = (checked) => {
    setPostToCommunity(checked);
    let communityBoardStories = JSON.parse(localStorage.getItem('communityBoardStories')) || [];

    if (checked) {
      const exists = communityBoardStories.some(story => story.content === selectedStory.content);
      if (!exists) communityBoardStories.push(selectedStory);
    } else {
      communityBoardStories = communityBoardStories.filter(
        story => story.content !== selectedStory.content
      );
    }

    localStorage.setItem('communityBoardStories', JSON.stringify(communityBoardStories));
  };

  const handleFavoriteToggle = (checked) => {
    setIsFavorite(checked);
    let favoriteStories = JSON.parse(localStorage.getItem(`favoriteStories_${username}`)) || [];

    if (checked) {
      const exists = favoriteStories.some(story => story.content === selectedStory.content);
      if (!exists) favoriteStories.push(selectedStory);
    } else {
      favoriteStories = favoriteStories.filter(
        story => story.content !== selectedStory.content
      );
    }

    localStorage.setItem(`favoriteStories_${username}`, JSON.stringify(favoriteStories));
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
          {storedTempUser?.username === selectedStory.author && (
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
