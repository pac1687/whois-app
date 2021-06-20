import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';
import "./App.css";
import Highlight from 'react-highlight';

const GET_WHOIS = gql`
    query GetWhois($domain: String!) {
      whois(domain: $domain) {
        name
        domainStatus
        nameServers
        registryExpiration
        created
        administrativeContact {
          organization
          state
          countryCode
        }
        technicalContact {
          organization
          state
          countryCode
        }
        registrantContact {
          organization
          state
          countryCode
        }
        registrar {
          name
          ianaID
          abuseContactPhone
          abuseContactEmail
        }
      }
    }
  `

function App() {
  const [domain, setDomain] = useState('');
  const [nextDomain, setNextDomain] = useState('');

  const { data } = useQuery(GET_WHOIS, {
    variables: { domain }
  });

  const onChange = event => {
    setNextDomain(event.currentTarget.value);
  }

  const onSubmit = async event => {
    event.preventDefault();
    setDomain(`${nextDomain}`);
    setNextDomain('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Whois Data</h2>
      </header>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <input type="text" value={nextDomain} onChange={onChange}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      {data &&
        <div className="whois-container">
          <Highlight className="json">
            {JSON.stringify(data, null, 2)}
          </Highlight>
        </div>
      }
    </div>
  );
}

export default App;