import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSubjectsByDepartmentCodeClassCode } from '../../../../redux/actions/departmentActions';
import { transformKeyToLabel } from '../../../../shared/helpers/array-helpers';
import { subjectParameters } from '../../../../shared/constants/common-constants';

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
            <th className="text-center">#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Parameters</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            subjects.map((d, index) => (
              <tr key={index + 1}>
                <th scope="row" className="text-center">{index + 1}</th>
                <td>{d.code}</td>
                <td>{d.name}</td>
                <td>{transformKeyToLabel(d.parameters, { array: subjectParameters, isCsv: true })}</td>
                <td className="text-center">{d.isActive ? 'Active' : 'In-Active' }</td>
              </tr>
            ))
          }
          {
            subjects.length === 0 &&
            <tr>
              <td colSpan="4">No subjects found!</td>
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
