const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const app = express()
app.use(express.urlencoded({extended: false}))


mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.listen(5000)
app.set('view engine', 'ejs')


app.use(methodOverride('_method'))

app.use('/articles', articleRouter)

app.get("/", async function(req, res) {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})