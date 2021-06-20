
import {
  ApolloClient,
  InMemoryCache
} from '@apollo/client';

const cache = new InMemoryCache({
  addTypename: false
})

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache
})