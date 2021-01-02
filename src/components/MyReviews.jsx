import { useQuery } from '@apollo/client';
import React from 'react';
import { AUTHORIZED_USER } from '../graphql/queries';
import ReviewList from './ReviewList';

const MyReviews = () => {
  const { loading, data, fetchMore } = useQuery(AUTHORIZED_USER, {
    variables: {includeReviews: true, first: 2 },
    fetchPolicy: 'cache-and-network'
  });
  const user = data?.authorizedUser;
  const reviews = user?.reviews;
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && user && user.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: AUTHORIZED_USER,
      variables: {
        after: user.reviews.pageInfo.endCursor,
       includeReviews: true, first: 2
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            }
          },
        };

        return nextResult;
      },
    });
  };

  if (loading) {
    return null;
  }

  return <ReviewList extended reviews={reviews} onEndReach={handleFetchMore} />;
};


export default MyReviews;