const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

const WhoisAPI = require('./datasource')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    whoisAPI: new WhoisAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`Send queries to ${url}`);
});