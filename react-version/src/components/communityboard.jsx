import '../communityboard.css';
import { Link } from 'react-router-dom';

export function CommunityBoard(){
    return (
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
                <header id="page-title"><u><b>Community Board</b></u></header>
                <br />
                <Link to="/story" className="story-card">
                    <b>The Haunted Mansion</b>
                    <p>by TrashBoat1848</p>
                    <p>5❤️</p>
                </Link>
                <Link to="/story" className="story-card">
                    <b>New Sports Class</b>
                    <p>by TheAmazingSpider-Man</p>
                    <p>3❤️</p>
                </Link>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}