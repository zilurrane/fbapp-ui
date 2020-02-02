import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSubjectsByDepartmentCodeClassCode } from '../../../../redux/actions/departmentActions';

class SubjectsTable extends Component {
  static propTypes = {
    getAllSubjectsByDepartmentCodeClassCode: PropTypes.func.isRequired,
    classes: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    const { classes } = this.props;
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
            classes.map((d, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{d.code}</td>
                <td>{d.name}</td>
              </tr>
            ))
          }
          {
            classes.length === 0 &&
            <tr>
              <td colSpan="3">No classes found!</td>
            </tr>
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state, props) => ({ classes: (state.departments.subjects[props.departmentCode] || {})[props.classCode] || [] });
const mapDispatchToProps = { getAllSubjectsByDepartmentCodeClassCode };
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsTable);
