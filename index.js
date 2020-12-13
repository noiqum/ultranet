const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
////////////////////////////////////////
const Port = process.env.PORT || 5000;
require('dotenv').config();
//////////////////////////////////////
const typeDefs = gql`
    type Query{
        test:String!
    }
`
const resolvers = {
    Query: {
        test: () => 'hi there'
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
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

