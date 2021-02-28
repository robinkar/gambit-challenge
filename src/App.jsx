import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DataTable from './components/DataTable';

import './App.css';

function App() {
  const [data, setData] = useState([]);

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
      <DataTable data={data} />
    </div>
  );
}

export default App;
