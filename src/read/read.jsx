import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './read.css';

export function Read(){
    const navigate = useNavigate();
    const storedTempUser = JSON.parse(localStorage.getItem('tempUser'));

    const selectedStory = localStorage.getItem('selectedStory');
    const filledWords = JSON.parse(localStorage.getItem('filledWords'));
    const story = storyData[selectedStory].story;

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
                <header id="storyTitle"><b><u>{storyData[selectedStory].title}</u></b></header>
                <p id="username"><i>by {storedTempUser.username}</i></p>
                <p id="storyContent">Lorum Ipsum Dolor</p>
                <br />
                <div id="next-step-buttons">
                    <Button className="buttons" onClick={() => navigate('/mystories')}>Save Story</Button>
                    <Button className="buttons" onClick={() => navigate('/createstory')}>Delete Story</Button>
                    <Button className="buttons" onClick={() => navigate('/createstory')}>Create</Button>
                </div>
            </section>
            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}