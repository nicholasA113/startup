const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
require('dotenv').config();

const app = express();
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = [];
let stories = [];
let favorites = {};

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

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
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

apiRouter.get('/stories', (_req, res) => {
  const publicStories = stories.filter(story => story.postToCommunity);
  res.send(publicStories);
});

apiRouter.get('/mystories', verifyAuth, (req, res) => {
  const userStories = stories.filter(story => story.author === req.user.username);
  res.send(userStories);
});

apiRouter.post('/stories', async (req, res) => {
  const { title, content, postToCommunity, author } = req.body;
  const storyAuthor = author || (req.user ? req.user.username : 'Guest');

  const newStory = {
    id: uuid.v4(),
    title,
    content,
    postToCommunity,
    author: storyAuthor,
  };
  stories.push(newStory);
  res.send(newStory);
});

apiRouter.put('/stories/:id', verifyAuth, (req, res) => {
  const id = req.params.id;
  const story = stories.find(s => s.id === id);
  if (!story) return res.status(404).send({ msg: 'Story not found' });

  if (story.author !== req.user.username) {
    return res.status(403).send({ msg: 'Forbidden' });
  }

  if (typeof req.body.postToCommunity === 'boolean') {
    story.postToCommunity = req.body.postToCommunity;
  }
  if (typeof req.body.title === 'string') {
    story.title = req.body.title;
  }
  if (typeof req.body.content === 'string') {
    story.content = req.body.content;
  }

  res.send(story);
});


apiRouter.get('/favorites', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });

  const userFavorites = favorites[user.username] || [];
  const favoriteStories = stories.filter(story => userFavorites.includes(story.id));
  res.send(favoriteStories);
});

apiRouter.post('/favorites/:storyId', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' })
  };

  const { storyId } = req.params;
  const username = user.username;

  if (!favorites[username]) {
    favorites[username] = []
  };

  const alreadyFavorited = favorites[username].includes(storyId);
  if (alreadyFavorited) {
    favorites[username] = favorites[username].filter(id => id !== storyId);
  } else {
    favorites[username].push(storyId);
  }

  const favoriteStories = stories.filter(story => favorites[username].includes(story.id));
  res.send(favoriteStories);
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { username, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
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
  console.log('→ /api/quote called');
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    const quoteData = data[0];
    res.send([{ quote: quoteData.q, author: quoteData.a }]);
  } catch (err) {
    console.error('Error fetching quote:', err);
    res.status(500).send({ error: 'Failed to fetch quote', details: err.message });
  }
});


app.use((err, _req, res, _next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
