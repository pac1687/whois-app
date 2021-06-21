import React, { useState } from "react";
import { gql, useLazyQuery } from '@apollo/client';
import "./App.css";
import Highlight from 'react-highlight';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: "black";
  border-style: solid;
  border-radius: 25px;
  width: 50%;
`;

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
  `;

function App() {
  const [domain, setDomain] = useState('');
  const [getWhoisData, { data, error }] = useLazyQuery(GET_WHOIS);

  const onChange = event => {
    setDomain(event.currentTarget.value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    getWhoisData({ variables: { domain }, errorPolicy: 'all' });
    setDomain('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Whois Data</h2>
      </header>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <Input type="text" placeholder="Enter a Domain or IP Address" value={domain} onChange={onChange} />
          <Input type="submit" value="Go!" />
        </form>
      </div>
      {data && !error &&
        <div className="whois-container">
          <Highlight className="json">
            {JSON.stringify(data, null, 2)}
          </Highlight>
        </div>
      }
      {error &&
        <div>
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </div>
      }
    </div>
  );
};

export default App;