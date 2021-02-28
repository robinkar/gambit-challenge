import React from 'react';

const DataEntry = ({ data }) => (
  <tr>
    <td>{data.name}</td>
    <td>{data.value}</td>
  </tr>
);

export default DataEntry;
