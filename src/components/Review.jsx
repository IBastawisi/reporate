import { useQuery } from '@apollo/client';
import React from 'react';
import { View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REVIEWS } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewList from './ReviewList';

const Review = () => {
  const { id } = useParams();
  const { loading, data, fetchMore } = useQuery(GET_REVIEWS, {
    variables: { id, first: 2 },
    fetchPolicy: 'cache-and-network'
  });
  const repo = data?.repository;
  const reviews = repo?.reviews;

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && repo && repo.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REVIEWS,
      variables: {
        after: repo.reviews.pageInfo.endCursor,
        id, first: 2
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            }
          },
        };

        return nextResult;
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };


  if (loading) {
    return null;
  }

  return (<View >
    <RepositoryItem extended item={repo} />
    <ReviewList reviews={reviews} onEndReach={onEndReach} />
  </View>
  );
};


export default Review;