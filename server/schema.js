const { gql } = require('apollo-server')

const typeDefs = gql`
  type Whois {
    name: String
    domainStatus: [String!]
    nameServers: [String!]
    registryExpiration: String
    created: String
    administrativeContact: AdministrativeContact
    technicalContact: TechnicalContact
    registrantContact: RegistrantContact
    registrar: Registrar
  }
  type AdministrativeContact {
    organization: String
    state: String
    countryCode: String
  }
  type RegistrantContact {
    organization: String
    state: String
    countryCode: String
  }
  type Registrar {
    name: String
    ianaID: String
    abuseContactPhone: String
    abuseContactEmail: String
  }
  type TechnicalContact {
    organization: String
    state: String
    countryCode: String
  }
  # queries
  type Query {
    whois(domain: String!): Whois
  }
`

module.exports = typeDefs