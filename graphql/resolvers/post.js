const checkAuth = require('../../utils/auth')
const Post = require('../../models/Post');


module.exports = {
    Query: {
        getPost: async () => {

        }
    },
    Mutation: {
        createPost: async (_, { postInput: { option, content } }, context) => {
            // const user = checkAuth(context);
            console.log(context)
            // console.log(user)
            console.log(option, content)
            return {
                id: 'deneme'
            }
        }
    }
}