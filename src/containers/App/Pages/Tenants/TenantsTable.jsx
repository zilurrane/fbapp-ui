import React, { Fragment, Component } from 'react';
import { Table } from 'reactstrap';

class TenantsTable extends Component {
  render() {
    return (
      <Fragment>
        <Table size="sm" hover striped>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Code</th>
              <th>Name</th>
              <th>E-Mail</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default TenantsTable;
