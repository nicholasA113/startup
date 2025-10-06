import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Index(){
    return (
        <>
            <header>
                <h1>Mad Libs©</h1>
            </header>
            <section>
                <div id="welcome">
                    <p><i>Welcome to Mad Libs©! Please login or signup to get started.</i></p>
                </div>
                <div id="user-password">
                    <label htmlFor="text">Username: </label>
                    <input type="text" id="username" name="varUsername" placeholder="username" />
                    <br />
                    <label htmlFor="text">Password: </label>
                    <input type="text" id="password" name="varPassword" placeholder="password" />
                </div>
                <br />
                <Link to="/createstory" className="button">Login</Link>
                <Link to="/createstory" className="button">Create</Link>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}