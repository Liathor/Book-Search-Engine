import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($input: UserInput!) {
  createUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        title
      }
    }
  }
`;
