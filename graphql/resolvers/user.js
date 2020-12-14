const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
    );
}


module.exports = {
    Query: {
        test: () => 'hi there'
    },
    Mutation: {
        register: async (_, {
            authInput: { username, email, password }
        }) => {
            //validate user data
            //make sure user doesnt already exist
            //hash the password and create an user token
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            });

            const resultFromBD = await newUser.save();

            const token = generateToken(resultFromBD);

            return {
                ...resultFromBD._doc,
                id: resultFromBD._id,
                token
            };

        }
    }
}