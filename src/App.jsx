import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from './components/DataTable';

import './App.css';

function App() {
  const [data, setData] = useState({ timestamp: '', data: [] });

  useEffect(() => {
    axios
      .get('/api/data')
      .then((result) => result.data)
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Failed to retrieve data from API', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Modbus data</h1>
      <p>{`Showing data from ${data.timestamp}`}</p>
      <DataTable data={data.data} />
    </div>
  );
}

export default App;
