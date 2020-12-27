const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typedefs/typedefs');
const resolvers = require('./graphql/resolvers/index')
////////////////////////////////////////
const Port = process.env.PORT || 5000;
require('dotenv').config();
//////////////////////////////////////

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        req
    })
})
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('mongodb connected')
        server.listen(Port, (req, res) => {

        }).then((res) => {
            console.log(`server in running on ${res.url}`)
        }).catch(err => {
            console.log(err)
        })
    }

})

