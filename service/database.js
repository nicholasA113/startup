const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('madlibs');
const userCollection = db.collection('user');
const storyCollection = db.collection('story');
const favoriteCollection = db.collection('favorite');

(async function testconnection() {
    try {
        await db.command({ ping: 1});
        console.log('Connected to database');
    }
    catch (ex) {
        console.error(`Unable to connect to database: ${ex.message}`);
        process.exit(1);
    }
})();

async function getUser(username){
    return userCollection.findOne({username});
}

async function getUserByToken(token) {
    return userCollection.findOne({token});
}

async function addUser(user) {
    return userCollection.insertOne(user);
}

async function updateUserToken(username, token){
    return userCollection.updateOne({username}, { $set: {token}});
}

async function addStory(story) {
    return storyCollection.insertOne(story);
}

async function getUserStories(username) {
    return storyCollection.find({author: username}).toArray();
}

async function getCommunityStories() {
    return storyCollection.find({ postToCommunity: true}).toArray();
}

async function updateStory(id, updates) {
    return storyCollection.updateOne({id}, {$set: updates});
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
    const favorites = await favoriteCollection.find({username}).toArray();
    const storyIds = favorites.map( f => f.storyId);
    return storyCollection.find({ id: {$in: storyIds}}).toArray();
}

async function getStory(id) {
    return storyCollection.findOne({id});
}

module.exports = {
    getUser,
    addUser,
    getUserByToken,
    updateUserToken,
    addStory,
    getStory,
    getUserStories,
    getCommunityStories,
    updateStory,
    toggleFavorite,
    getFavorites,
};