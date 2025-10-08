import React from 'react';
import './about.css';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function About(){
    const navigate = useNavigate();

    return (
        <main id="about-main">
            <div id="page-guidance">
                <br />
                <h1 id="mad-libs-title">Mad Libs©</h1>
                <Button className="buttons" onClick={() => navigate('/createstory')}>Create Story</Button>
                <Button className="buttons" onClick={() => navigate('/mystories')}>My Stories</Button>
                <Button className="buttons" onClick={() => navigate('/communityboard')}>Community Board</Button>
                <Button className="buttons" onClick={() => navigate('/about')}>About</Button>
                <hr />
            </div>
            <section id="about-section">
                <h2 id="about-title">
                <b><u>About</u></b>
                </h2>
                <p>A community-based version of the popular wacky storytelling activity!</p>
                <aside>
                <i>Created by Nicholas Erickson</i>
                </aside>
            </section>
            <footer className="footer">
                <hr />
                <NavLink className='nav-link' to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}