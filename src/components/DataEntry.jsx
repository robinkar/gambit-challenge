import React from 'react';

const DataEntry = ({ data }) => (
  <tr className="data-entry">
    <td className="data-entry-name">{data.name}</td>
    <td className="data-entry-value">{data.value}</td>
  </tr>
);

export default DataEntry;
