import React from 'react';
import '../communityboard/communityboard.css';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function MyStories(){
    const navigate = useNavigate();

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
                <p><u>[Username's] Stories</u></p>
                <Button className="story-card" onClick={() => navigate('/story')}>The Haunted Mansion</Button>
                <Button className="story-card" onClick={() => navigate('/story')}>Grocery Shopping</Button>
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