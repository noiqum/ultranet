const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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
    }),
})

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use("/images", express.static('public/images'))
server.applyMiddleware({ app })
app.listen(Port, (req, res) => {
    console.log(`server is running`)
})
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('mongodb connected')
        // app.listen(Port, (req, res) => {
        //     console.log(`server is running`)
        // })
    }

})

