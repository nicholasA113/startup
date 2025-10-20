import React from 'react';
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

    const fullStory = storyTemplate
        ? storyTemplate.replace(/{{(\d+)}}/g, (_, i) => filledWords[i - 1])
        : selectedReadStory?.content;

    const author = storedTempUser?.username;
    const title = selectedReadStory?.title;

    const handleSaveStory = () => {
        const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
        const newStory = {
            title,
            content: fullStory,
            author: storedTempUser.username,
        };
        savedStories.push(newStory);
        localStorage.setItem('savedStories', JSON.stringify(savedStories));
        navigate('/mystories');
    };

    const handleCreateAnother = () => {
        const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
        const newStory = {
            title,
            content: fullStory,
            author: storedTempUser.username,
        };
        savedStories.push(newStory);
        localStorage.setItem('savedStories', JSON.stringify(savedStories));
        navigate('/createstory');
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
                <header id="storyTitle"><b><u>{storyTitle}</u></b></header>
                <p id="username"><i>by {author}</i></p>
                <p id="storyContent">{fullStory}</p>
                <br />
                <div id="checkbox-area">
                    {storedTempUser?.username === author && (
                        <>
                            <label htmlFor="checkbox1">Post to Community Board?</label>
                            <input type="checkbox" id="checkbox1" name="varCheckbox1" value="checkbox1" />
                            <p> | </p>
                        </>
                    )}
                    <label htmlFor="checkbox2">Save Story to Favorites?</label>
                    <input type="checkbox" id="checkbox2" name="varCheckbox2" value="checkbox2" />
                </div>
                <br />
                <br />
                <div id="next-step-buttons">
                    <Button className="buttons" onClick={handleSaveStory}>Save Story</Button>
                    <Button className="buttons" onClick={() => navigate('/createstory')}>Delete Story</Button>
                    <Button className="buttons" onClick={handleCreateAnother}>Create Another Story</Button>
                </div>
            </section>

            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}
