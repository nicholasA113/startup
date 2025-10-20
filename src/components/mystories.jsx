import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../communityboard/communityboard.css';

export function MyStories() {
  const navigate = useNavigate();
  const storedTempUser = JSON.parse(localStorage.getItem('tempUser')) || { username: 'Guest' };
  const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];

  const userStories = savedStories.filter(story => story.author === storedTempUser.username);

  return (
    <main id="main-page">
      <header id="page-guidance">
        <h1 id="mad-libs-title">Mad Libs©</h1>
      </header>

      <section id="sections-page">
        <header id="page-title"><b><u>My Stories</u></b></header>
        {userStories.length > 0 ? (
          userStories.map((story, i) => (
            <div
              key={i}
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
          <p>No stories yet.</p>
        )}
      </section>
    </main>
  );
}
