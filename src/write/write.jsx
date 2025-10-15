import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './write.css';

export function Write(){
    const navigate = useNavigate();
    const selectedStory = localStorage.getItem('selectedStory');

    const storyData = {
            'haunted-mansion': {
                title: 'Haunted Mansion',
                words: ["Adjective", "Noun", "Verb (past tense)", "Sound", 
                        "Body part", "Animal", 
                        "Exclamation", "Emotion"],
                story: `Last night, I went exploring a {{1}} old mansion at the 
                    edge of town. The air smelled like {{2}} and dust. Suddenly, 
                    something {{3}} behind me! I froze when I heard a {{4}} coming 
                    from the hallway. My {{5}} started to tingle with fear. Out of 
                    nowhere, a ghostly {{6}} floated by. I screamed, '{{7}}!' and 
                    ran out as fast as I could, feeling {{8}} but kind of thrilled.`
            },
            'grocery-shopping' : {
                title: 'Grocery Shopping',
                words: ["Verb", "Adjective", "Plural noun", "Number", "Type of liquid",
                       "Food", "Verb (past tense)", "Emotion"],
                story: `Today I went to the store to {{1}} some groceries. 
                    The aisles were filled with {{2}} {{3}}, and I grabbed {{4}} 
                    of them. I also picked up a bottle of {{5}} and some {{6}} for 
                    dinner. But when I got to the checkout, I realized I’d {{7}} 
                    my wallet at home! I felt so {{8}} that I just left everything 
                    and ran out.`
            },
            'ordering-pizza' : {
                title: 'Ordering Pizza',
                words: ["Adjective", "Number", "Food (plural)", "Silly word", 
                       "Animal", "Emotion", "Verb", "Celebrity name"],
                story: `I was so {{1}} that I decided to order {{2}} pizzas. 
                    I told the pizza place to cover them with {{3}} and a drizzle 
                    of {{4}} sauce. The delivery driver showed up riding a {{5}}, 
                    which made me feel {{6}}. When I went to pay, I realized 
                    I’d accidentally {{7}} all my money! Luckily, {{8}} was 
                    with me and covered the bill.`
            },
            'new-sports-class' : {
                title: 'New Sports Class',
                words: ["Sport", "Adjective", "Body part", "Verb (ending in -ing)",
                        "Noun", "Emotion", "Sound", "Adverb"],
                story: `I signed up for a {{1}} class today. The coach was super 
                        {{2}} and told us to stretch our {{3}} before {{4}}. My 
                        favorite part was when we got to use the {{5}} to practice. 
                        I felt {{6}} when I finally got it right and shouted 
                        {{7}} {{8}}. Everyone laughed, but it was the best 
                        workout ever!`
            },
            'first-day-on-job' : {
                title : 'First Day on the Job',
                words: ["Job title", "Adjective", "Noun", "Verb (past tense)",
                       "Adjective", "Body part", "Silly word", "Emotion"],
                story: `It was my first day as a {{1}}, and I wanted to make a 
                    {{2}} impression. I carried my {{3}} proudly and {{4}} into 
                    the office with a smile. But things got {{5}} when I spilled 
                        water on my {{6}} and yelled '{{7}}!' Everyone stared, 
                        but I just laughed and kept going. By the end of the day, 
                        I felt {{8}} about how it all turned out.`
            },
        };
        
        const story = storyData[selectedStory];
        
        const [inputs, setInputs] = useState(Array(story.words.length).fill(''));
        
        const handleChange = (i, value) => {
        const copy = [...inputs];
        copy[i] = value;
        setInputs(copy);
        };
        
        const handleGenerate = () => {
        localStorage.setItem('filledWords', JSON.stringify(inputs));
        navigate('/read');
        };

    return(
        <main id="write-page">
            <header id="page-guidance">
                <br />
                <h1 id="mad-libs-title">Mad Libs©</h1>
                <Button className="buttons" onClick={() => navigate('/createstory')}>Create Story</Button>
                <Button className="buttons" onClick={() => navigate('/mystories')}>My Stories</Button>
                <Button className="buttons" onClick={() => navigate('/communityboard')}>Community Board</Button>
                <Button className="buttons" onClick={() => navigate('/about')}>About</Button>
                <hr />
            </header>

          <section id="text-fields">
            <ul>
              {story.words.map((word, i) => (
                <li key={i}>
                  <span>{word}: </span>
                <input 
                    type="text" 
                    value={inputs[i]} 
                    onChange={(e) => handleChange(i, e.target.value)} /></li>))}
            </ul>
          </section>

            <section id="generate">
                <Button className="buttons" onClick={handleGenerate}>Generate Story</Button>
                <br />
            </section>
            
            <footer className="footer">
                <hr />
                <NavLink className="nav-link" to="https://github.com/nicholasA113/startup">Github</NavLink>
            </footer>
        </main>
    );
}
