import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './createstory.css';

export function CreateStory(){
    const navigate = useNavigate();

    return (
        <body>
            <header id="page-guidance">
                <h1>Mad Libs©</h1>
                <img src="https://live.staticflickr.com/3860/14754157821_75127554ac_z.jpg" height="150" />
                <p>Welcome, [username]!</p>
                <aside>
                <p><i>"[3rd-party API implementation of a random quote generator]"</i></p>
                </aside>
                <Button onClick={() => navigate(<CreateStory />)}>Create Story</Button>
                <Button onClick={() => navigate(<MyStories />)}>My Stories</Button>
                <Button onClick={() => navigate(<CommunityBoard />)}>Community Board</Button>
                <Button onClick={() => navigate(<About />)}>About</Button>
                <hr />
            </header>
            <section>
                <h2 id="create-story"><b><u>Create Story</u></b></h2>
                <p>Which story would you like to create from?</p>
                <div>
                <Button onClick={() => navigate(<Write />)}>Haunted Mansion</Button><br />
                <Button onClick={() => navigate(<Write />)}>Grocery Shopping</Button><br />
                <Button onClick={() => navigate(<Write />)}>Ordering Pizza</Button><br />
                <Button onClick={() => navigate(<Write />)}>New Sports Class</Button><br />
                <Button onClick={() => navigate(<Write />)}>First Day on the Job</Button><br />
                </div>
            </section>
            <footer>
                <hr />
                <NavLink className='nav-link' to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </body>
    );
}