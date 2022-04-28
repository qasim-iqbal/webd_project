const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bcryptjs = require('bcryptjs');
const localStrategy = require('passport-local').Strategy
const app = express.Router()
const Users = require('../models/users')
module.exports = (app) => {

    isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    } 
    
    notLoggedIn = (req, res, next) => {
        if (!req.isAuthenticated()) return next();
        res.redirect('/')
    } 
passport.use(Users.createStrategy())

passport.serializeUser(Users.serializeUser((user, done) => {
    done(null, user.id)
}))
passport.deserializeUser(Users.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user)
    })
}))

passport.use(new localStrategy((username, password, done) => {
	Users.findOne({ username: username }, (err, user) => {

		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcryptjs.compare(password, user.password, (err, res) => {

			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

app.post('/login', passport.authenticate('local', {
    successRedirect: "/articles",
    failureRedirect:'/login'
}))

app.post('/register', async (req, res) => {
    Users.findOne({username: req.body.username}, (err, user) => {
        if (user) {
            res.send("User already exists")
        }
    })
    var user = new Users()
    user.username = req.body.username;
    user.password = await bcryptjs.hash(req.body.password,10);
    user.save((err) => {
        if (err) {
            res.redirect('register')
        }
        res.redirect('login')
    });
})
app.get("/login", notLoggedIn, function(req, res) {
    res.render('articles/login')
})
app.get("/register", notLoggedIn, function(req, res) {
    res.render('articles/register')
})
}
