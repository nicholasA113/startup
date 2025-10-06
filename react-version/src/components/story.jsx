import '../read.css';
import { Link } from 'react-router-dom';

export function Story(){
    return (
        <>
            <header id="page-guidance">
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
                <div id="checkbox-area">
                <label htmlFor="checkbox1">Post to Community Board?</label>
                <input type="checkbox" id="checkbox1" name="varCheckbox1" value="checkbox1"/>
                <label htmlFor="checkbox2">  |  Save Story to Favorites?</label>
                <input type="checkbox" id="checkbox2" name="varCheckbox2" value="checkbox2"/>
                </div>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}