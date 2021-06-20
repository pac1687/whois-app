module.exports = {
  Query: {
    whois: (_, { domain }, { dataSources }) =>
    dataSources.whoisAPI.getWhois({ domain })
  }
}