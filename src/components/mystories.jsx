import React from 'react';
import '../communityboard/communityboard.css';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function MyStories() {
    const navigate = useNavigate();
    const storedTempUser = JSON.parse(localStorage.getItem('tempUser')) || { username: 'Guest' };
    const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];

    return (<main id="main-page">
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
        <p><u>{storedTempUser.username}'s Stories</u></p>

        {savedStories.length > 0 ? (
          savedStories.map((story, i) => (
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
          <p>No stories created yet.</p>
        )}

        <br />
        <p><u>Favorited Stories</u></p>

        <div className="story-card"
          onClick={() => navigate('/story')}>
              <h3>New Sports Class</h3>
              <p><i>by TheAmazingSpider-man</i></p>
        </div>
      </section>

      <footer className="footer">
        <hr />
        <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
      </footer>
    </main>
  );
}

