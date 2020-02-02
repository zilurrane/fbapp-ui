import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSubjectsByDepartmentCodeClassCode } from '../../../../redux/actions/departmentActions';

class SubjectsTable extends Component {
  static propTypes = {
    getAllSubjectsByDepartmentCodeClassCode: PropTypes.func.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getAllSubjectsByDepartmentCodeClassCode(this.props.departmentCode, this.props.classCode);
  }

  componentDidUpdate(prevProps) {
    if (!(prevProps.departmentCode === this.props.departmentCode && prevProps.classCode === this.props.classCode)) {
      this.props.getAllSubjectsByDepartmentCodeClassCode(this.props.departmentCode, this.props.classCode);
    }
  }

  render() {
    const { subjects } = this.props;
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
            subjects.map((d, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{d.code}</td>
                <td>{d.name}</td>
              </tr>
            ))
          }
          {
            subjects.length === 0 &&
            <tr>
              <td colSpan="3">No subjects found!</td>
            </tr>
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state, props) => ({ subjects: (state.departments.subjects[props.departmentCode] || {})[props.classCode] || [] });
const mapDispatchToProps = { getAllSubjectsByDepartmentCodeClassCode };
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsTable);
