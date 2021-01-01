import { useContext } from 'react';
import { useApolloClient, useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/mutations";
import AuthStorageContext from '../contexts/AuthStorageContext';
import { setContext } from '@apollo/client/link/context';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGNIN);
  const apolloClient = useApolloClient();

  const signIn = async (credentials) => {
    const { data } = await mutate({ variables: { credentials } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    
    setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = data.authorize.accessToken;
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      };
    });
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;