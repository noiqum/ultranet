const { Schema, model } = require('mongoose')





const postSchema = new Schema({
    username: String,
    option: String,
    content: String,
    createdAt: String,
    friend: {
        type: Schema.Types.ObjectId,
        username: String,
        ref: 'users'
    },
    mood: String,
    place: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema);