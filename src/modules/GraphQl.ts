import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GITHUB_GQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_GITHUB_PAT_KEY;
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const GQLClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export const getTopStarRepositoryQuery = () => {
  //This is something I would really like to improve. I feel the languages should be dynamic and the query should be TypeScripted
  //The sorting part of query also needs work
  return gql`
  query  {
    search(type: REPOSITORY, query: "language:TypeScript|Javascript stars:>1000 sort:stars", first: 10) {
      edges {
        node {
          ... on Repository {
            name
          }
        }
      }
    }
  }
  `
}
