import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);

  return { loading, error, repositories: data?.repositories };
};

export default useRepositories;