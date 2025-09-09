import { request } from './client';
import { gql } from 'graphql-request';

const LOGIN_MUTATION = gql`
  mutation Login($emailAddress: String!, $password: String!) {
    login(username: $emailAddress, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
    }
  }
`;

// Function to handle login
export const login = async (emailAddress: string, password: string) => {
  const data = await request(LOGIN_MUTATION, { emailAddress, password });
  // The client automatically handles cookies, but for bearer tokens, you'd
  // manually extract the token from headers here.
  return data.login;
};

// Function to handle logout
export const logout = async () => {
  const data = await request(LOGOUT_MUTATION);
  return data.logout;
};

// Function to get current user
export const getCurrentUser = async () => {
  const data = await request(GET_CURRENT_USER);
  return data.activeCustomer;
};
