const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.find().sort({ createdAt: -1 }).then(posts => {
    res.render('index', { posts });
  });
});

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('newpost');
});

router.post('/', ensureAuthenticated, (req, res) => {
  const { title, content, tags } = req.body;
  const newPost = new Post({ title, content, tags, author: req.user.id });

  newPost.save().then(post => {
    req.flash('success_msg', 'Post created successfully');
    res.redirect('/');
  }).catch(err => {
    console.log(err);
    req.flash('error_msg', 'Error creating post');
    res.redirect('/posts/new');
  });
});

module.exports = router;