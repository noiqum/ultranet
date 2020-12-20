const User = require('../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateLoginInput, validateRegisterInput } = require('../../utils/validate')


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

            const { errors, valid } = validateRegisterInput(username, email, password);

            if (!valid) {
                throw new UserInputError('Error', {
                    errors
                })
            }

            //make sure user doesnt already exist

            const userFromDBforUsername = await User.findOne({ username });

            if (userFromDBforUsername) {
                throw new UserInputError('username is already taken', {
                    errors: {
                        username: 'username is already taken'
                    }
                })
            }

            const userFromDBforEmail = await User.findOne({ email });

            if (userFromDBforEmail) {
                throw new UserInputError('email is already in use', {
                    errors: {
                        email: 'email is already in use'
                    }
                })
            }

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

        },

        login: async (_, { email, password }) => {

            const { errors, valid } = validateLoginInput(email, password);

            if (!valid) {
                throw new UserInputError('Error', {
                    errors
                })
            }

            const userFromDB = await User.findOne({ email });

            if (!userFromDB) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, userFromDB.password);

            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(userFromDB);

            return {
                ...userFromDB._doc,
                id: userFromDB._id,
                token
            };

        },
        verifyToken: (_, { token }) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
                if (err) throw new UserInputError('Error')
                return { id: decodedToken.id };
            })
        }
    }
}