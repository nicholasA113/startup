import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './createstory.css';

export function CreateStory(){
    const navigate = useNavigate();
    const storedTempUser = JSON.parse(localStorage.getItem('tempUser'));

    return (
        <main id="main">
            <header id="page-guidance">
                <h1 id="title">Mad Libs©</h1>
                <img id="image" src="https://live.staticflickr.com/3860/14754157821_75127554ac_z.jpg" height="150" />
                <p>Welcome, {storedTempUser.username}!</p>
                <aside>
                <p><i>"[3rd-party API implementation of a random quote generator]"</i></p>
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
                <Button className="buttons" id="haunted-mansion" onClick={() => 
                    navigate('/write')}>Haunted Mansion</Button><br />
                <Button className="buttons" id="grocery-shopping" onClick={() => 
                    navigate('/write')}>Grocery Shopping</Button><br />
                <Button className="buttons" id="ordering-pizza" onClick={() => 
                    navigate('/write')}>Ordering Pizza</Button><br />
                <Button className="buttons" id="new-sports-class" onClick={() => 
                    navigate('/write')}>New Sports Class</Button><br />
                <Button className="buttons" id="first-day-on-job" onClick={() => 
                    navigate('/write')}>First Day on the Job</Button><br />
                </div>
            </section>
            
            <footer className="footer">
                <hr />
                <NavLink className='nav-link' to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}