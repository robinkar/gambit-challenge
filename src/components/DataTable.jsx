import React from 'react';
import DataEntry from './DataEntry';

const DataTable = ({ data }) => (
  <div>
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <DataEntry key={d.id} data={d} />
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
