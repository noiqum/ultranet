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
            if (files) {
                const uploads = files.map(fileFromClient => {
                    return addFile(fileFromClient);
                })
                console.table(uploads);
            }
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