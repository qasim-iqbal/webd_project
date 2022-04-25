const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

// const commentSchema = new mongoose.Schema({
//     body: String
// })

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        postedBy: String,
        comment: String,
        postedDate: {
            type: Date,
            default: Date.now
        }
    }],
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema)
// module.exports = mongoose.model('Comment', commentSchema)