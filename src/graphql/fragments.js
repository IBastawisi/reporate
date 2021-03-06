import { gql } from '@apollo/client';

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id,
    user {
      username,
    }
    rating,
    createdAt,
    text,
  }
`;
