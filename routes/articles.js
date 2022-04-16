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
module.exports = router