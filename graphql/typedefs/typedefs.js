const { gql } = require('apollo-server');

module.exports = gql`
type Query{
    test:String!
    getPost:[Post!]
    getUser:User!
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
type TokenResponse{
    id:String!
    email:String!
}
input FriendInput{
    id:ID!
    username:String! 
}
type Friend{
    id:ID!
    username:String! 
}
type File {
    _id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }
input CreatePostInput{
    option:String! 
    content:String! 
    friend:[FriendInput] 
    mood:String 
    place:String
    files:[Upload]
}
type Post{
    id:ID!
    userID:ID! 
    username:String!
    content:String! 
    option:String! 
    friend:[Friend] 
    mood:String 
    place:String
    files:[String]
}
type Mutation{
    register(authInput: AuthInput):User!
    login(email: String!, password: String!): User!
    verifyToken(token:String!):TokenResponse!
    createPost(postInput:CreatePostInput):Post!
}
`

