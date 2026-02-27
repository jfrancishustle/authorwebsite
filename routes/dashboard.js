const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/app.db');

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

router.use(requireAuth);

router.get('/', (req, res) => {
  db.get('SELECT * FROM users WHERE id = ?', [req.session.userId], (err, user) => {
    if (err) return console.error(err.message);
    db.all('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [req.session.userId], (err, rows) => {
      if (err) return console.error(err.message);
      res.render('dashboard', { posts: rows, user: user });
    });
  });
});

router.get('/new', (req, res) => {
  res.render('create_post');
});

router.post('/new', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)', [req.session.userId, title, content], (err) => {
    if (err) return console.error(err.message);
    res.redirect('/dashboard');
  });
});

module.exports = router;
