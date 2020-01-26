import React from 'react';
import { Table } from 'reactstrap';

const DepartmentsTable = () => (
  <Table size="sm" hover striped>
    <thead>
      <tr>
        <th>#</th>
        <th>Code</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>COMP</td>
        <td>Computer Engineering</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>EXTC</td>
        <td>Electronics and Telecommunication Engineering</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>AUTO</td>
        <td>Automobile Engineering</td>
      </tr>
    </tbody>
  </Table>
);

export default DepartmentsTable;
