import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './communityboard.css';

export function CommunityBoard(){
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
                <header id="page-title"><u><b>Community Board</b></u></header>
                <br />
                <Button className="story-card" onClick={() => navigate('/story')}>
                    <b>The Haunted Mansion</b>
                    <p>by TrashBoat1848</p>
                    <p>5❤️</p>
                </Button>
                <Button className="story-card" onClick={() => navigate('/story')}>
                    <b>New Sports Class</b>
                    <p>by TheAmazingSpider-Man</p>
                    <p>3❤️</p>
                </Button>
            </section>
            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}