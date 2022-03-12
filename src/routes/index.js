const { version } = require("discord.js");
const passport = require("passport");
const express = require("express");

const router = express.Router();

router.get('/', async(req, res) => {
    res.render('index', {
        tag: (req.user ? req.user.tag : 'Login'),
        bot: req.client,
        user: req.user || null,
    });
});

router.get('/login', passport.authenticate('discord', { failureRedirect: '/' }), async function(req, res) {
    if (!req.user.id || !req.user.guilds) {
        res.redirect('/');
    } else res.redirect('/');
});

router.get('/logout', async function(req, res) {
    req.session.destroy(() => {
        req.logout();
        res.redirect('/');
    });
});

module.exports = router;
