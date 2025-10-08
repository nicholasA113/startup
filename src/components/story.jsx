import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../read/read.css';

export function Story(){
    const navigate = useNavigate();

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
                <header id="storyTitle"><b><u>Story Title</u></b></header>
                <p id="username"><i>by [username]</i></p>
                <p id="storyContent">Lorum Ipsum Dolor</p>
                <br />
                <div id="checkbox-area">
                    <label for="checkbox1">Post to Community Board?</label>
                    <input type="checkbox" id="checkbox1" name="varCheckbox1" value="checkbox1"/>
                    <label for="checkbox2">  |  Save Story to Favorites?</label>
                    <input type="checkbox" id="checkbox2" name="varCheckbox2" value="checkbox2"/>
                </div>
            </section>
            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}