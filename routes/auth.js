const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./database/app.db');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return console.error(err.message);
    if (row) {
      bcrypt.compare(password, row.password, (err, result) => {
        if (result) {
          req.session.userId = row.id;
          res.redirect('/dashboard');
        } else {
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password, bio } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return console.error(err);
    db.run('INSERT INTO users (username, password, bio) VALUES (?, ?, ?)', [username, hash, bio], (err) => {
      if (err) {
        console.error(err.message);
        return res.redirect('/register');
      }
      res.redirect('/login');
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
