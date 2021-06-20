const { RESTDataSource } = require('apollo-datasource-rest')

class WhoisAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';
  }

  async getWhois({ domain }) {
    const response = await this.get(`?apiKey=${process.env.WHOIS_API_KEY}&domainName=${domain}&outputFormat=JSON&ignoreRawTexts=1`);
    return this.whoisReducer(response.WhoisRecord);
  }

  whoisReducer(whoisData) {
    const domainStatuses = whoisData.status.split(" ")

    return {
      name: whoisData.domainName,
      domainStatus: domainStatuses,
      nameServers: whoisData.nameServers.hostNames,
      registryExpiration: whoisData.registryData.expiresDate,
      created: whoisData.registryData.createdDate,
      administrativeContact: {
        organization: whoisData.administrativeContact.organization,
        state: whoisData.administrativeContact.state,
        countryCode: whoisData.administrativeContact.countryCode
      },
      technicalContact: {
        organization: whoisData.technicalContact.organization,
        state: whoisData.technicalContact.state,
        countryCode: whoisData.technicalContact.countryCode
      },
      registrantContact: {
        organization: whoisData.registrant.organization,
        state: whoisData.registrant.state,
        countryCode: whoisData.registrant.countryCode
      },
      registrar: {
        name: whoisData.registrarName,
        ianaID: whoisData.registrarIANAID,
        abuseContactPhone: whoisData.customField2Value,
        abuseContactEmail: whoisData.customField1Value 
      }
    }
  }
}

module.exports = WhoisAPI