import '../about.css';
import { Link } from 'react-router-dom';

export function About(){
    return (
        <>
            <div>
                <br />
                <h1>Mad Libs©</h1>
                <Link to="/createstory" className="button">Create Story</Link>
                <Link to="/mystories" className="button">MyStories</Link>
                <Link to="/communityboard" className="button">Community Board</Link>
                <Link to="/about" className="button">About</Link>
                <hr />
            </div>
            <section>
                <b><u>About</u></b>
                <p>A community-based version of the popular wacky storytelling activity!</p>
                <aside>
                    <i>Created by Nicholas Erickson</i>
                </aside>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}