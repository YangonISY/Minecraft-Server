const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login-or-register');
    }
});

// Index page
router.get('/login-or-register', (req, res) => {
    res.render('login-or-register');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;