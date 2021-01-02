const checkAuth = require('../../utils/auth')
const Post = require('../../models/Post');

const addFile = require('../../utils/file');


module.exports = {
    Query: {
        getPost: async () => {

        }
    },
    Mutation: {
        createPost: async (_, { postInput: { option, content, files } }, context) => {

            const user = checkAuth(context);

            const newPost = new Post({
                username: user.username,
                user: user.id,
                option,
                content,
                createdAt: new Date().toISOString()
            })
            if (files) {
                const fileNames = files.map(item => {
                    return addFile(item).filename
                })
                newPost.files = [...fileNames]
            }
            const post = newPost.save()
            return {
                ...post._doc,
                id: post._id
            }
        }
    }
}