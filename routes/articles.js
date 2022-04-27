const express = require('express')
const article = require('./../models/article')
const Article = require('./../models/article')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('articles/index')
})

router.get('/create', (req, res) => {
    res.render('articles/create', {article: new Article()})
})

router.get('/update/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('articles/update', {article: article})
})
router.get('/reply/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/reply', {article: article})
})
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('articles/view', {article: article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
    }, saveArticleAndRedirect('create')
)
router.put('/:id', async (req, res, next) => {
    req.article = await article.findById(req.params.id)
    next()
    }, saveArticleAndRedirect('update')
)

router.put('/replied/:id', async (req, res, next) => {
    req.article = await article.findById(req.params.id)
    next()
    }, saveCommentAndRedirect('view')
)
function saveCommentAndRedirect() {
    return async (req, res) => {
        let article = req.article

        Article.findByIdAndUpdate(
            article._id,
            {$push: {"comments": {postedBy: req.body.username, comment:req.body.comment}}},
            {safe: true, upsert: true, new: true},
            (err, doc) => {
                console.log('err');
            }
        )
        res.redirect(`/articles/${article.slug}`)

    }

}
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
                article.title= req.body.title
                article.description= req.body.description
                article.markdown= req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch(e) {
            res.render(`articles/${path}`, {article: article})
        }
    }
}

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.post('/articles/post-comment', function(req, res) {
    article.findByIdAndUpdate({"_id": req.body.post_id}, {
        $push: {
            "comments": {username: req.body.username, comment: req.body.comment}
        }
    }, function (error, post) {
        res.send("comment successful!")
    })
})
module.exports = router