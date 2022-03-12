const { Strategy } = require('passport-discord');
const session = require("express-session");
const bodyparser = require('body-parser');
const passport = require('passport');
const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

module.exports.load = async (client) => {

    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());
    

    app.engine('html', ejs.renderFile);

    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'ejs');
    

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(session({
        secret: 'rootzedyn',
        resave: false,
        saveUninitialized: false
    }));

    app.use(async function(req, res, next) {
        req.client = client;
        next();
    });

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: [ 'identify' ],
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }))

    app.use('/verify', require('./routes/verify'));
    app.use('/', require('./routes/index'));
    

    app.listen(process.env.PORT, (err) => {
        console.log(`Running on port ${process.env.PORT}`);
    });
}