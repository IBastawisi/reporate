import { gql } from '@apollo/client';
import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy:$orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          ...RepoDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }

  ${REPO_DETAILS}
`;
export const GET_REVIEWS = gql`
  query getReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      url,
      ...RepoDetails
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }

  ${REPO_DETAILS}
  ${REVIEW_DETAILS}
`;

export const AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false, $first: Int, $after: String) {
  authorizedUser {
    id,
    username
    reviews (first: $first, after: $after) @include(if: $includeReviews) {
      edges {
        node {
          ...ReviewDetails,
          repository {
            id,
            fullName
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }    
    }
  }
}

${REVIEW_DETAILS}

`;