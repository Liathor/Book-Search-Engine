import { gql } from '@apollo/client';

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter

export const searchGoogleBooks = (query: string) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
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