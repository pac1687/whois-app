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
    let domainStatuses;
    if (whoisData.status) {
      domainStatuses = whoisData.status.split(" ")
    }

    return {
      name: whoisData.domainName,
      domainStatus: domainStatuses,
      nameServers: whoisData.nameServers ? whoisData.nameServers.hostNames : null,
      registryExpiration: whoisData.registryData.expiresDate,
      created: whoisData.registryData.createdDate,
      administrativeContact: {
        organization: whoisData.administrativeContact ? whoisData.administrativeContact.organization : null,
        state: whoisData.administrativeContact ? whoisData.administrativeContact.state : null,
        countryCode: whoisData.administrativeContact ? whoisData.administrativeContact.countryCode : null
      },
      technicalContact: {
        organization: whoisData.technicalContact ? whoisData.technicalContact.organization : null,
        state: whoisData.technicalContact ? whoisData.technicalContact.state : null,
        countryCode: whoisData.technicalContact ? whoisData.technicalContact.countryCode : null
      },
      registrantContact: {
        organization: whoisData.registrant ? whoisData.registrant.organization : null,
        state: whoisData.registrant ? whoisData.registrant.state : null,
        countryCode: whoisData.registrant ? whoisData.registrant.countryCode : null
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