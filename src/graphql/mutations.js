import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation authorize($credentials: AuthorizeInput!) {
    authorize(credentials:$credentials)  {
      user {
        username
      },
      accessToken,
      expiresAt
    }
  }
`;