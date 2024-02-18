const Post = require('../models/post');
const fs = require('fs');

const postsPath = './posts.json';

const getPostsData = () => {
    try {
        const postsData = fs.readFileSync(postsPath);
        return JSON.parse(postsData);
    } catch (error) {
        console.error('Error reading posts data:', error);
        return [];
    }
};

const writePostsData = (postsData) => {
    try {
        fs.writeFileSync(postsPath, JSON.stringify(postsData, null,  2));
    } catch (error) {
        console.error('Error writing posts data:', error);
    }
};

const getAllPosts = (req, res) => {
    const posts = getPostsData();
    res.json(posts);
};

const createNewPost = (req, res) => {
    const newPost = new Post(req.body.id, req.body.title, req.body.author, req.body.date, req.body.content, req.body.tags);
    let postsData = getPostsData();
    if (!Array.isArray(postsData)) {
        postsData = [];
    }
    postsData.push(newPost);
    writePostsData(postsData);
    res.status(201).send('Post created successfully');
};

const getById = (req, res) => {
    const postId = req.params.id;
    const postsData = getPostsData();
    const post = postsData.find(post => post.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
};

const updatePost = (req, res) => {
    const postId = req.params.id;
    const updatedPostData = req.body;
    let postsData = getPostsData();
    const index = postsData.findIndex(post => post.id === postId);
    if (index !== -1) {
        postsData[index] = { ...postsData[index], ...updatedPostData };
        writePostsData(postsData);
        res.send('Post updated successfully');
    } else {
        res.status(404).send('Post not found');
    }
};

const deletePost = (req, res) => {
    const postId = req.params.id;
    let postsData = getPostsData();
    const filteredPosts = postsData.filter(post => post.id !== postId);
    if (filteredPosts.length < postsData.length) {
        writePostsData(filteredPosts);
        res.send('Post deleted successfully');
    } else {
        res.status(404).send('Post not found');
    }
};

module.exports = {
    getAllPosts,
    createNewPost,
    getById,
    updatePost,
    deletePost
};


