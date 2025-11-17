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

AWS website: https://startup.madlibs.click
Simon sub-domain: https://simon.madlibs.click

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

**HTML pages** - Added HTML pages for each button of the application, as well as any additional pages when navigating through a certain page--notably the Create Story page  
**Proper HTML element usage** - Added headers, section dividers, and footers for each page.  
**Links** - Added link to my Github repository at the bottom of each page. Used the "onclick" HTML feature to navigate from one page to another when clicking on a button.  
**Text** - Included text on each page to communicate the purpose of each page and what the user can do with it.  
**3rd party API placeholder** - 3rd party API implementation will take place on the main createstory.html page that will serve as a random quote generator.  
**Images** - Added image to the main page of the application (createstory.html)  
**Login placeholder** - index.html includes text fields to insert a username and password, as well as "login" and "create" buttons.  
**DB data placeholder** - Placeholder data represented under the "My Stories" tab. Page will populate with all of the user's stories from the database.  
**WebSocket placeholder** - Live-update functionality enabled for "communityboard.html". Once a user saves their story, it will be updated under the community board page"

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

**Header, footer, and main content body** - styled header, footer, and main content bodies different from one another. There's a universal background, but differing colors between sections to contrast them.  
**Navigation elements** - page navigation at the top of each page navigates to the correct page, along with buttons navigating to the next pages/steps for selecting, writing, and reading a story. Stories under "my stories" and "community board" also navigate to a page to read the story.  
**Responsive to window resizing** - Elements still on display when zooming in or out of the page  
**Application elements** - Elements of the application are mostly buttons, leading you to differnet pages/parts the application. Text fields are also present for login as well as writing the necessary words for the story. Checkboxes are also found on story.html to allow for visibility on community board page and favorites section of my stories.  
**Application text content** - Varying styles and font sizes for application text content. Underline and bolded page titles contrast from the simple text found below. Italicized text is also present for a few various elements.
**Application images** - Created border around image element  

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

**Bundled using Vite** - Used vite to bundle the project, porting all old html to new jsx files, still using previous elements from css files.    
**Components** - Slightly modified and updated css elements such as NavLinks and Bootstrap buttons to conform to each new jsx page serving as a path for a BrowserRouter  
**Router** - All html files were converted to jsx files. Each page serving now as a route path on my app.jsx file, allows for application to transition from page to page seamlessly without a refresh to a new html page.  

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

**All functionality implemented or mocked out** - full functionallity of users able to create stories with their specified word inputs, posting stories to community board, and saving stories to favorites  
**Hooks** - useEffect and useState functions implemented for storing and managing data  

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

**Node.js/Express HTTP service** - created a node.js file that houses all endpoints  
**Static middleware for frontend** - implemented app.use calls in index.js and a custom verifyAuth function  
**Calls to third party endpoints** - Implemented third party endpoint in createstory.jsx for a random quote generator  
**Backend service endpoints** - endpoints for login, logout, post for story, get, etc.  
**Frontend calls service endpoints** - Calls endpoints when logging in, creating/saving a story, fetching the quote, etc.  
**Supports registration, login, logout, and restricted endpoint** - endpoints for login, logout, and a verifyAuth function to prevent restricted access.  


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

**Stores data in MongoDB** - Created mongo database, made calls to store data in the database for stories  
**Stores credentials in MongoDB** - Calls created that stores username and encrypted passwords in the database, retrives username in particular for various places throughout the application  

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

**Backend listens for WebSocket connection** - peerProxy file creates the websocket server  
**Frontend makes WebSocket connection** - establishes websocket connection once a user logins in  
**Data sent over WebSocket connection** - message broadcast to all logged in users when a user has saved a story to the community board, and whenever the communityboard checkmark is toggled on for a story  
**WebSocket data displayed** - Messaged displayed on the bottom of the page when data has been sent over a websocket connection  
**Application is fully functional** - App is fully functional, with login capabilities, ability to create a madlib, save and share stories to communityboard or favorites section, and websocket messages sent when a user has publicly shared a story to the communityboard  
