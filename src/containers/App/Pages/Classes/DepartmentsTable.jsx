import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllDepartments } from '../../../../redux/actions/departmentActions'

class DepartmentsTable extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    departments: PropTypes.any,
  };

  componentDidMount() {
    this.props.getAllDepartments();
  }
  render() {
    const { departments } = this.props;
    return (
      <Table size="sm" hover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            departments.map((d, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{d.code}</td>
                  <td>{d.name}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({ departments: state.departments.departments });
const mapDispatchToProps = { getAllDepartments: getAllDepartments };
export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsTable);
