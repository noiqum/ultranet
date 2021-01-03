const checkAuth = require('../../utils/auth')
const Post = require('../../models/Post');
const path = require('path');
const fs = require('fs');
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
                files,
                createdAt: new Date().toISOString()
            })
            const post = newPost.save()
            return {
                ...post._doc,
                id: post._id
            }
        },
        uploadFile: async (_, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream()
            const pathName = path.join(__dirname, `/public/images/${filename}`);
            await stream.pipe(fs.createWriteStream(pathName))
            return {
                url: `https://ancient-retreat-96821.herokuapp.com/public/images/${filename}`
            }
        }
    }
}