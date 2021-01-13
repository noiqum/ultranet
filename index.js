const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typedefs/typedefs');
const resolvers = require('./graphql/resolvers/index');
const cors = require('cors')
////////////////////////////////////////
const Port = process.env.PORT || 5000;
require('dotenv').config();
//////////////////////////////////////

const corsOptions = {
    origin: '*',
    credentials: true
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        req
    })
})
const app = express()
app.use(cors())
server.applyMiddleware({ app });

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('mongodb connected')
        app.listen({ port: Port }, () =>
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
        )
        // .then((res) => {
        //     console.log(`server in running on ${res.url}`)
        // }).catch(err => {
        //     console.log(err)
        // })
    }

})