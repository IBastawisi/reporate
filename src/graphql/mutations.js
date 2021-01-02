import { gql } from '@apollo/client';
import { REVIEW_DETAILS } from './fragments';

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

export const CREATE_REVIEW = gql`
  mutation createReview( $review: CreateReviewInput! ) {
    createReview(review: $review) {
      ...ReviewDetails
    }
  }

  ${REVIEW_DETAILS}
`;
export const SIGNUP = gql`
  mutation createUser( $user: CreateUserInput! ) {
    createUser(user: $user) {
      id,
      username
    }
  }
`;
export const DELETE_REVIEW = gql`
  mutation deleteReview( $id: ID! ) {
    deleteReview(id: $id)
  }
`;