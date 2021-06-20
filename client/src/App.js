import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Highlight from 'react-highlight';

function App() {
  const [whoisData, setWhoisData] = useState({});
  const [domain, setDomain] = useState('');
  const [received, setReceived] = useState(false);

  const getWhoisData = async () => {
    const response = await axios.get(`http://localhost:8000/lookup?domain=${domain}`);
    setWhoisData(response.data);
    setReceived(true);
  };

  const onChange = event => {
    setDomain(event.target.value);
  }

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await getWhoisData();
    } catch (e) {
      console.log('error...', e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Whois Data</h2>
      </header>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <input type="text" value={domain} onChange={onChange}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      {received &&
        <div className="whois-container">
          <Highlight className="json">
            {JSON.stringify(whoisData, null, 2)}
          </Highlight>
        </div>
      }
    </div>
  );
}

export default App;