import React from 'react';
import '../communityboard/communityboard.css';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function MyStories(){
    const navigate = useNavigate();
    const storedTempUser = JSON.parse(localStorage.getItem('tempUser'));
    const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];

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
                <p><u>{storedTempUser.username} Stories</u></p>
                
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
                        <p><i>by {story.author}</i></p>
                      </div>
                    ))}
                (
                  <p>No stories created.</p>
                )}
        
                <br />
                
                <p><u>Favorited Stories</u></p>
                <Button className="story-card" onClick={() => navigate('/story')}>
                    New Sports Class
                    <p>by TheAmazingSpider-man</p>
                </Button>
            </section>
            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );

}
