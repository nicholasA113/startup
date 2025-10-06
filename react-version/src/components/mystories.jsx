import './communityboard.css';
import { Link } from 'react-router-dom';

export function mystories(){
    return(
        <>
            <header id="page-guidance">
                <br />
                <h1>Mad Libs©</h1>
                <Link to="/createstory" className="button">Create Story</Link>
                <Link to="/mystories" className="button">MyStories</Link>
                <Link to="/communityboard" className="button">Community Board</Link>
                <Link to="/about" className="button">About</Link>
                <hr />
            </header>
            <section>
                <header id="page-title"><b><u>My Stories</u></b></header>
                <p><u>[Username's] Stories</u></p>
                <Link to="/story" className="story-card">The Haunted Mansion</Link>
                <Link to="/story" className="story-card">Grocery Shopping</Link>
                <br />
                <p><u>Favorited Stories</u></p>
                <Link to="/story" className="story-card">
                    New Sports Class
                    <p>by TheAmazingSpider-Man</p>
                </Link>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}