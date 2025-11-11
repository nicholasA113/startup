const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('madlibs');

const userCollection = db.collection('user');
const storyCollection = db.collection('story');
const favoriteCollection = db.collection('favorite');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to database');
  } catch (ex) {
    console.error(`Unable to connect to database with ${url}: ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateUserToken(username, token) {
  await userCollection.updateOne({ username }, { $set: { token } });
}

async function addStory(story) {
  story.id = String(story.id);
  return storyCollection.insertOne(story);
}

function getUserStories(username) {
  return storyCollection.find({ author: username }).toArray();
}

function getCommunityStories() {
  return storyCollection.find({ postToCommunity: true }).toArray();
}

async function getStory(id) {
  return storyCollection.findOne({ id: String(id) });
}

async function updateStory(id, updates) {
  return storyCollection.updateOne({ id: id }, { $set: updates });
}

async function toggleFavorite(username, storyId) {
    const fav = await favoriteCollection.findOne({username, storyId});
    if (fav) {
        return favoriteCollection.deleteOne({username, storyId});
    }
    else {
        return favoriteCollection.insertOne({username, storyId});
    }
}

async function getFavorites(username) {
  const favorites = await favoriteCollection.find({ username }).toArray();
  const storyIds = favorites.map(f => f.storyId);
  return storyCollection.find({ id: { $in: storyIds } }).toArray();
}

module.exports = {
    getUser,
    addUser,
    getUserByToken,
    updateUser,
    updateUserToken,
    addStory,
    getStory,
    getUserStories,
    getCommunityStories,
    updateStory,
    toggleFavorite,
    getFavorites,
};
