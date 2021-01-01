import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';



const createApolloClient = (authStorage) => {

  const httpLink = createHttpLink({
    uri: Constants.manifest.extra.apolloURI,
  });
  
  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token =  await authStorage.getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};

export default createApolloClient;