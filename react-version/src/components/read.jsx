import '../read.css';
import { Link } from 'react-router-dom';

export function Read(){
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
                <header id="storyTitle"><b><u>Story Title</u></b></header>
                <p id="username"><i>by [username]</i></p>
                <p id="storyContent">Lorum Ipsum Dolor</p>
                <br />
                <div>
                    <Link to="/mystories" className="button">Save Story</Link>
                    <Link to="/createstory" className="button">Delete Story</Link>
                    <Link to="/createstory" className="button">Create Another Story</Link>
                </div>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}