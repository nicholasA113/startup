import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './createstory.css';

export function CreateStory() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };

    useEffect(() => {
    const fetchQuote = async () => {
        try {
        const res = await fetch('/api/quote');
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const data = await res.json();
        setQuote(data[0]?.quote || 'Inspiration unavailable right now!');
        } catch (err) {
        console.error(err);
        setQuote('Error fetching quote.');
        }
    };
    fetchQuote();
    }, []);


  return (
    <main id="main">
      <header id="page-guidance">
        <h1 id="title">Mad Libs©</h1>
        <img
          id="image"
          src="https://live.staticflickr.com/3860/14754157821_75127554ac_z.jpg"
          height="150"
          alt="mad-libs"
        />
        <p>Welcome, {user.username}!</p>
        <aside>
          <p><i>"{quote}"</i></p>
        </aside>

        <Button className="buttons" onClick={() => navigate('/createstory')}>Create Story</Button>
        <Button className="buttons" onClick={() => navigate('/mystories')}>My Stories</Button>
        <Button className="buttons" onClick={() => navigate('/communityboard')}>Community Board</Button>
        <Button className="buttons" onClick={() => navigate('/about')}>About</Button>
        <hr />
      </header>

      <section id="main-section">
        <h2 id="create-story"><b><u>Create Story</u></b></h2>
        <p>Which story would you like to create from?</p>
        <div>
          {['haunted-mansion', 'grocery-shopping', 'ordering-pizza', 'new-sports-class', 'first-day-on-job'].map((story) => (
            <Button
              key={story}
              className="buttons"
              onClick={() => {
                localStorage.setItem('selectedStory', story);
                navigate('/write');
              }}
            >
              {story.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </Button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <hr />
        <NavLink className='nav-link' to="https://github.com/nicholasA113/startup">Github</NavLink>
      </footer>
    </main>
  );
}