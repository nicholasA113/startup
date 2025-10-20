import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../read/read.css';

export function Story() {
  const navigate = useNavigate();
  const storedTempUser = JSON.parse(localStorage.getItem('tempUser'));
  const selectedStory = JSON.parse(localStorage.getItem('selectedReadStory'));

  if (!selectedStory) return <p>No story selected</p>;

  return (
    <main id="read-page">
      <header id="page-guidance">
        <h1 id="mad-libs-title">Mad Libs©</h1>
      </header>

      <section id="story">
        <header id="storyTitle"><b><u>{selectedStory.title}</u></b></header>
        <p id="username"><i>by {selectedStory.author}</i></p>
        <p id="storyContent">{selectedStory.content}</p>

        <div id="checkbox-area">
          {storedTempUser.username === selectedStory.author && (
            <>
              <label htmlFor="checkbox1">Post to Community Board?</label>
              <input type="checkbox" id="checkbox1" name="varCheckbox1" value="checkbox1" />
              <span>|</span>
            </>
          )}
          <label htmlFor="checkbox2">Save Story to Favorites?</label>
          <input type="checkbox" id="checkbox2" name="varCheckbox2" value="checkbox2" />
        </div>
      </section>
    </main>
  );
}
