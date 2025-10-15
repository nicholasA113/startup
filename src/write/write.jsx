import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './write.css';

export function Write(){
    const navigate = useNavigate();
    const selectedStory = JSON.parse(localStorage.getItem('selectedStory'));

    handleWordList = () => {
        const story = localStorage.getItem('selectedStory');

        const storyData = {
            'haunted-mansion': {
                title: 'Haunted Mansion',
                words = [],
            },
            'grocery-shopping' : {
                title: 'Grocery Shopping',
                words = [],
            },
            'ordering-pizza' : {
                title: 'Ordering Pizza',
                words = [],
            },
            'new-sports-class' : {
                title: 'New Sports Class',
                words = [],
            },
            'first-day-on-job' : {
                title : 'First Day on the Job',
                words = [],
            },
        };
    }

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
                <ul>
                    {story.words.map((word, i) =>
                    <li key={i}>{word}</li>
                )}</ul>
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