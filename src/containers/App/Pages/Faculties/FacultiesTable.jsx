import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllFacultiesByDepartmentCode } from '../../../../redux/actions/departmentActions';

class FacultiesTable extends Component {
  static propTypes = {
    getAllFacultiesByDepartmentCode: PropTypes.func.isRequired,
    faculties: PropTypes.arrayOf(PropTypes.object).isRequired,
    departmentCode: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getAllFacultiesByDepartmentCode(this.props.departmentCode);
  }

  componentDidUpdate(prevProps) {
    if (!(prevProps.departmentCode === this.props.departmentCode)) {
      this.props.getAllFacultiesByDepartmentCode(this.props.departmentCode);
    }
  }

  render() {
    const { faculties } = this.props;
    return (
      <Table size="sm" hover striped>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Qualification</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            faculties.map((d, index) => (
              <tr key={index + 1}>
                <th scope="row" className="text-center">{index + 1}</th>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.qualification}</td>
                <td className="text-center">{d.isActive ? 'Active' : 'In-Active' }</td>
              </tr>
            ))
          }
          {
            faculties.length === 0 &&
            <tr>
              <td colSpan="5">No faculties found!</td>
            </tr>
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state, props) => ({ faculties: state.departments.faculties[props.departmentCode] || [] });
const mapDispatchToProps = { getAllFacultiesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(FacultiesTable);
