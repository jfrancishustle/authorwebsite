const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/app.db');

router.get('/:username', (req, res) => {
  const username = req.params.username;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return console.error(err.message);
    if (!user) return res.status(404).send('User not found');

    db.all('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [user.id], (err, posts) => {
      if (err) return console.error(err.message);
      res.render('site_home', { user, posts });
    });
  });
});

router.get('/:username/:postid', (req, res) => {
  const { username, postid } = req.params;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return console.error(err.message);
    if (!user) return res.status(404).send('User not found');

    db.get('SELECT * FROM posts WHERE id = ? AND user_id = ?', [postid, user.id], (err, post) => {
      if (err) return console.error(err.message);
      if (!post) return res.status(404).send('Post not found');
      res.render('site_post', { user, post });
    });
  });
});

module.exports = router;
