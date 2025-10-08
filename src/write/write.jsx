import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './write.css';

export function Write(){
    const navigate = useNavigate();

    return(
        <main id="write-page">
            <header id="page-guidance">
                <br />
                <h1 id="mad-libs-title">Mad Libs©</h1>
                <Button className="buttons" onClick={() => navigate('/createstory')}>Create Story</Button>
                <Button className="buttons" onClick={() => navigate('/mystories')}>My Stories</Button>
                <Button className="buttons" onClick={() => navigate('/communityboard')}>Community Board</Button>
                <Button className="buttons" onClick={() => navigate('/about')}>About</Button>
                <hr />
            </header>
            <section id="text-fields">
                <table>
                    <tr>
                        <td id="word-type"><label htmlFor="noun1">Noun: </label></td>
                        <td><input type="text" id="noun1" name="varNoun1"/></td>
                    </tr>
                    <tr>
                        <td id="word-type"><label htmlFor="adj1">Adjective: </label></td>
                        <td><input type="text" id="adj1" name="varAdj1"/></td>
                    </tr>
                    <tr>
                        <td id="word-type"><label htmlFor="verb1">Verb: </label></td>
                        <td><input type="text" id="verb1" name="varVerb1"/></td>
                    </tr>
                </table>
            </section>
            <section id="generate">
                <Button className="buttons" onClick={() => navigate('/read')}>Generate Story</Button>
                <br />
            </section>
            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}