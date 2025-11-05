const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
require('dotenv').config();
const db = require('./database.js');

const app = express();
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await db.getUser(username);

  if (existingUser) {
    return res.status(409).send({ msg: 'Existing user' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    password: passwordHash,
    token: uuid.v4(),
  };

  await db.addUser(newUser);
  setAuthCookie(res, newUser.token);
  res.send({ username: newUser.username });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUser(username);

  if (user && await bcrypt.compare(password, user.password)) {
    user.token = uuid.v4();
    await db.updateUser(user);
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    user.token = '';
    await db.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  }
  else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/stories', async (_req, res) => {
  const publicStories = await db.getCommunityStories();
  res.send(publicStories);
});

apiRouter.get('/mystories', verifyAuth, async (req, res) => {
  const userStories = await db.getUserStories(req.user.username);
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

  await db.addStory(newStory);
  res.send(newStory);
});

apiRouter.put('/stories/:id', verifyAuth, async (req, res) => {
  const id = req.params.id;
  const story = await db.getStory(id);
  if (!story) {
    return res.status(404).send({ msg: 'Story not found' });
  }
  if (story.author !== req.user.username) {
    return res.status(403).send({ msg: 'Forbidden' });
  }

  const updatedFields = {};
  if (typeof req.body.postToCommunity === 'boolean') {
    updatedFields.postToCommunity = req.body.postToCommunity;
  }
  if (req.body.title) {
    updatedFields.title = req.body.title
  };
  if (req.body.content) {
    updatedFields.content = req.body.content
  };

  await db.updateStory(id, updatedFields);
  res.send({ ...story, ...updatedFields });
});

apiRouter.get('/favorites', verifyAuth, async (req, res) => {
  const favoriteStories = await db.getFavorites(req.user.username);
  res.send(favoriteStories);
});

apiRouter.post('/favorites/:storyId', verifyAuth, async (req, res) => {
  const storyId = req.params.storyId;
  const updatedFavorites = await db.toggleFavorite(req.user.username, storyId);
  res.send(updatedFavorites);
});

apiRouter.get('/quote', async (_req, res) => {
  console.log('→ /api/quote called');
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    const quoteData = data[0];
    res.send([{ quote: quoteData.q, author: quoteData.a }]);
  } 
  catch (err) {
    console.error('Error fetching quote:', err);
    res.status(500).send({ error: 'Failed to fetch quote', details: err.message });
  }
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.use((err, _req, res, _next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

