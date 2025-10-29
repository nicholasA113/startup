const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const fetch = require('node-fetch');

require('dotenv').config();

const authCookieName = 'token';

let users = [];
let stories = [];
let favorites = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  if (await findUser('username', username)) {
    return res.status(409).send({ msg: 'Existing user' });
  }
  const user = await createUser(username, password);
  setAuthCookie(res, user.token);
  res.send({ username: user.username });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser('username', username);
  if (user && await bcrypt.compare(password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  } 
  else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user){
      delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } 
  else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/stories', async (_req, res) => {
  const publicStories = stories.filter(story => story.postToCommunity);
  res.send(publicStories);
});

apiRouter.get('/mystories', verifyAuth, (req, res) => {
  const userStories = stories.filter(story => story.author === req.user.username);
  res.send(userStories);
});

apiRouter.post('/stories', verifyAuth, async (req, res) => {
  const { title, content, postToCommunity } = req.body;
  const newStory = {
    id: uuid.v4(),
    title,
    content,
    postToCommunity,
    author: req.user.username,
  };
  stories.push(newStory);
  res.send(newStory);
});

apiRouter.get('/favorites', verifyAuth, (req, res) => {
  const userFavorites = favorites[req.user.username] || [];
  res.send(userFavorites);
});

apiRouter.post('/favorites/:storyId', verifyAuth, (req, res) => {
  const { storyId } = req.params;
  const username = req.user.username;

  if (!favorites[username]){
      favorites[username] = [];
  }

  const alreadyFavorited = favorites[username].includes(storyId);
  if (alreadyFavorited) {
    favorites[username] = favorites[username].filter(id => id !== storyId);
  }
  else {
    favorites[username].push(storyId);
  }

  res.send(favorites[username]);
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { username, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value){
      return null;
  }
  return users.find(u => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

apiRouter.get('/quote', async (_req, res) => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v2/randomquotes', {
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const quote = await response.json();
    res.send(quote);
  } catch (err) {
    console.error('Error fetching quote:', err);
    res.status(500).send({ error: 'Failed to fetch quote' });
  }
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
