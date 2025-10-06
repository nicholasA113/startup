import '../createstory.css';
import { Link } from 'react-router-dom';

export function CreateStory(){
    return(
        <>
            <header id="page-guidance">
                <h1>Mad Libs©</h1>
                <img src="https://live.staticflickr.com/3860/14754157821_75127554ac_z.jpg" 
                     height="150" 
                />
                <p>Welcome, [username]!</p>
                <aside>
                    <p><i>"[3rd-party API implementation of a random quote generator]"</i></p>
                </aside>
                <Link to="/createstory" className="button">Create Story</Link>
                <Link to="/mystories" className="button">MyStories</Link>
                <Link to="/communityboard" className="button">Community Board</Link>
                <Link to="/about" className="button">About</Link>
            </header>
            <section>
                <hr />
                <header id="create-story"><b><u>Create Story</u></b></header>
                <p>Which story would you like to create from?</p>
                <div>
                <Link to="/write" className="button">Haunted Mansion</Link><br />
                <Link to="/write" className="button">Grocery Shopping</Link><br />
                <Link to="/write" className="button">Ordering Pizza</Link><br />
                <Link to="/write" className="button">New Sports Day</Link><br />
                <Link to="/write" className="button">First Day on the Job</Link><br />
                </div>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}