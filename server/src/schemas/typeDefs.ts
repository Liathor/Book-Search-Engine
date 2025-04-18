const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [BookDocument]!
    bookCount: Number
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Book {
    _id: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
  }

  type Mutation {
    createUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!): Book
    deleteBook(bookId: ID!): Book
  }
`;

export default typeDefs;