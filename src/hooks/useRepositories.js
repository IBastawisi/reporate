import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({order, searchKeyword, first}) => {
  const orderBy = order.split(':')[0];
  const orderDirection = order.split(':')[1];

  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword, first },
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy, orderDirection, searchKeyword, first,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };
  return { loading, error, repositories: data?.repositories, fetchMore: handleFetchMore };
};

export default useRepositories;