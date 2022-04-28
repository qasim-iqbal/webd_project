const mongoose = require('mongoose')
const passportMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})
userSchema.plugin(passportMongoose)
module.exports = mongoose.model('Users', userSchema)