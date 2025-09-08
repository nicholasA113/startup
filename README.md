# Mad Libs

[My Notes](notes.md)

A startup application that provides entertainment for users with pre-written stories to create Mad Libs for. Users can also share their favorite Mad Libs to a community board that all users can see and enjoy in laughter.

> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

### Elevator pitch

Imagine a fun, interactive, community-based version of Mad Libs! From pre-written stories, users can fill in the blanks to create their own wacky versions of these stories and post them to a community board for others to see. Be as crazy and funny as you can be!

### Design

![Design image](mockup1.jpg)\
![Design image2](mockup2.jpg)\
![Design image3](mockup3.jpg)\
![Design image4](mockup4.jpg)

How the backend works for creating, saving, and seeing stories.

```mermaid
sequenceDiagram
    actor User
    participant App
    participant Server
    participant Database

    User ->> App: Create story
    App ->> Server: Save story
    Server ->> Database: Store story

    User ->> App: View community board
    App ->> Server: Request stories
    Server ->> Database: Get public stories
    Database -->> Server: Return stories
    Server -->> App: Send stories
    App -->> User: Show stories
```

### Key features

- Secure login via HTTPS
- Select pre-determined stories to create from
- Input of nouns, adjectives, etc., for each selected story
- Display of newly created story
- Options to privately save story and publicy share story to a community board
- Tabs/Pages for creating stories, seeing your saved stories (both private and public), and seeing community board (public) stories
- Ability to like community board stories. Stories are ranked on said page from most likes to lowest.

### Technologies
- **HTML** - Multiple pages for the app. A login/register page first appears, which takes to you the main landing page. Automatically open to a "Create Story" page, with tabs to choose seeing saved stories, and another for seeing community board stories.
    - Create story page takes you to other pages in the process of creating a Mad Lib.
- **CSS** - Visually pleasing styling with good fonts, color choices, and whitespace.
- **React** - Provides login capabilities, selection of stories, text input of words, as well as buttons to share and save stories.
- **Service** - Endpoints for login, submitting stories, and retrieving stories.
- **DB/Login** - Stores login info, stories that are selected to be saved, whether they are private or public, and which pages they should appear on depending on visibility. Also stores the structure for each pre-written story.
- **WebSocket** - Community board page lists all publicly shared stories across all users of the app. Gathers all stories at the time the "Community Board" button is selected.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
