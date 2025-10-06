import './write.css'

export default function MadLibs(){
    return(
        <>
            <header id="page-guidance">
                <h1>Mad Libs©</h1>
                <button onClick={() => window.location.href='createstory.html'}>
                    Create Story
                </button>
                <button onClick={() => window.location.href='mystories.html'}>
                    My Stories
                </button>
                <button onClick={() => window.location.href='communityboard.html'}>
                    Community Board
                </button>
                <button onClick={() => window.location.href='about.html'}>
                    About
                </button>
                <hr />
            </header>
            <section id="text-fields">
                <table>
                <tr>
                    <td id="word-type"><label for="text">Noun: </label></td>
                    <td><input type="text" id="noun1" name="varNoun1"/></td>
                </tr>
                <tr>
                    <td id="word-type"><label for="text">Adjective: </label></td>
                    <td><input type="text" id="adj1" name="varAdj1"/></td>
                </tr>
                <tr>
                    <td id="word-type"><label for="text">Verb: </label></td>
                    <td><input type="text" id="verb1" name="varVerb1"/></td>
                </tr>
                </table>
            </section>
            <section id="generate-button">
                <button id="generate" onclick="location.href='read.html'">Generate Story</button>
            </section>
            <footer>
                <hr />
                <a href="https://github.com/nicholasA113/startup">Github</a>
            </footer>
        </>
    );
}