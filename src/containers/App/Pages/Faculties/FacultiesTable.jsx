import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllFacultiesByDepartmentCodeClassCode } from '../../../../redux/actions/departmentActions';

class FacultiesTable extends Component {
  static propTypes = {
    getAllFacultiesByDepartmentCodeClassCode: PropTypes.func.isRequired,
    faculties: PropTypes.arrayOf(PropTypes.object).isRequired,
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string,
  };

  static defaultProps = {
    classCode: undefined,
  }

  componentDidMount() {
    this.props.getAllFacultiesByDepartmentCodeClassCode(this.props.departmentCode, this.props.classCode);
  }

  componentDidUpdate(prevProps) {
    if (!(prevProps.departmentCode === this.props.departmentCode && prevProps.classCode === this.props.classCode)) {
      this.props.getAllFacultiesByDepartmentCodeClassCode(this.props.departmentCode, this.props.classCode);
    }
  }

  render() {
    const { faculties } = this.props;
    return (
      <Table size="sm" hover striped>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Code</th>
            <th>Name</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            faculties.map((d, index) => (
              <tr key={index + 1}>
                <th scope="row" className="text-center">{index + 1}</th>
                <td>{d.code}</td>
                <td>{d.name}</td>
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

const mapStateToProps = (state, props) => ({ faculties: (state.departments.faculties[props.departmentCode] || {})[props.classCode] || [] });
const mapDispatchToProps = { getAllFacultiesByDepartmentCodeClassCode };
export default connect(mapStateToProps, mapDispatchToProps)(FacultiesTable);
