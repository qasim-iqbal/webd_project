// Packages
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport')
const bcryptjs = require('bcryptjs');
const localStrategy = require('passport-local').Strategy
// Models
const Users = require('./models/users')
const Article = require('./models/article')

// Routes
const articleRouter = require('./routes/articles')
const statsRouters = require('./routes/stats')

const app = express()
app.use(express.urlencoded({extended: false}))

// Connect to mongodb 
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const session = require("express-session")({
    secret: 'TechBlog(^&$#&(%#%^*((QQWR)',
    resave: false,
    saveUninitialized: false
});

const port = 5000;
app.listen(port, () => {
    console.log (`Server started at port ${port}`)
})

app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use('/articles', articleRouter)
app.use('/stats', statsRouters)
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
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
        // Checks if the user exists
		if (!user) return done(null, false);

        // Validates the inputted password with the encrypted password
		bcryptjs.compare(password, user.password, (err, result) => {
			if (err) return done(err);
			if (result == false) {
                return done(null, false);
            } else {
                return done(null, user);
            }
			
		});
	});
}));

app.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect:'/login'
}))

loggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
} 

notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/')
} 

app.get("/login", notLoggedIn, async function(req, res) {
    res.render('articles/login')
})
app.get("/logout", loggedIn, async function(req, res) {
    req.logout();
    res.render('articles/login')
})
app.get("/register", notLoggedIn, async function(req, res) {
    res.render('articles/register')
})
app.get("/", loggedIn , async function(req, res) {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles, user: req.user})
})