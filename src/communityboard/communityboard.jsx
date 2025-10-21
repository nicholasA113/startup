import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './communityboard.css';

export function CommunityBoard(){
    const navigate = useNavigate();
    const [communityBoardStories, setCommunityBoardStories] = useState([]);

    useEffect (() => {
        const storedStories = JSON.parse(localStorage.getItem('communityBoardStories')) || [];
        setCommunityBoardStories(storedStories);
    }, []);

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

            {communityBoardStories.length === 0 ? (
                <p style={{color: 'white'}}>No stories added to community board yet.</p>)
                : (
                    communityBoardStories.map((story, index) => (
                        <Button key={index} className="story-card"
                        onClick={() => {
                            localStorage.setItem('selectedReadStory', JSON.stringify(story));
                            navigate('/story');
                        }}>
                            <b>{story.title}</b>
                            <b>{story.author}</b>
                        </Button>
                    ))
                )
            }
            </section>

            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}