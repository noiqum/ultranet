const { gql } = require('apollo-server');

module.exports = gql`
type Query{
    test:String!
}
type User{
    id:ID!
    username:String!
    email:String!
    token:String!
}
input AuthInput{
    username:String!
    email:String!
    password:String!
}
type Mutation{
    register(authInput: AuthInput):User!
    login(email: String!, password: String!): User!
    verifyToken(token:String!):String!
}
`

