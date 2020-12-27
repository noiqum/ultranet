const checkAuth = require('../../utils/auth')
const Post = require('../../models/Post');


module.exports = {
    Query: {
        getPost: async () => {

        }
    },
    Mutation: {
        createPost: async (_, { postInput: { option, content } }, context) => {

            const user = checkAuth(context);

            const newPost = new Post({
                username: user.username,
                user: user.id,
                option,
                content,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save()
            console.log(post)
            return {
                ...post._doc,
                id: post._id
            }
        }
    }
}