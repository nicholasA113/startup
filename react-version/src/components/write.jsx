import '../write.css';
import { Link } from 'react-router-dom';

export function write(){
    return(
        <>
            <header id="page-guidance">
                <h1>Mad Libs©</h1>
                <Link to="/createstory" className="button">Create Story</Link>
                <Link to="/mystories" className="button">MyStories</Link>
                <Link to="/communityboard" className="button">Community Board</Link>
                <Link to="/about" className="button">About</Link>
                <hr />
            </header>
            <section id="text-fields">
                <table>
                <tr>
                    <td id="word-type"><label htmlFor="text">Noun: </label></td>
                    <td><input type="text" id="noun1" name="varNoun1"/></td>
                </tr>
                <tr>
                    <td id="word-type"><label htmlFor="text">Adjective: </label></td>
                    <td><input type="text" id="adj1" name="varAdj1"/></td>
                </tr>
                <tr>
                    <td id="word-type"><label htmlFor="text">Verb: </label></td>
                    <td><input type="text" id="verb1" name="varVerb1"/></td>
                </tr>
                </table>
            </section>
            <section id="generate-button">
                <Link to="/read" className="button">Generate Story</Link>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}