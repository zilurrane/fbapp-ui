/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getAllFacultiesByDepartmentCode } from '../../../../redux/actions/departmentActions';

const { Option } = Select;

class FacultySelection extends Component {
  static propTypes = {
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllFacultiesByDepartmentCode: PropTypes.func.isRequired,
    faculties: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    index: PropTypes.number.isRequired,
    handleFacultyChange: PropTypes.func.isRequired,
    handleDepartmentChange: PropTypes.func.isRequired,
    departmentCode: PropTypes.string.isRequired,
    facultyId: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.departmentCode !== this.props.departmentCode) {
      this.props.getAllFacultiesByDepartmentCode(this.props.departmentCode);
    }
  }

  handleDepartmentChange = (index, value) => {
    this.props.handleDepartmentChange(index, value);
  }

  render() {
    const {
      departments = [], faculties = {}, handleFacultyChange, index, departmentCode, facultyId,
    } = this.props;

    const facultiesPerDepartment = faculties[departmentCode] || [];
    return (
      <Row>
        <Col>
          <Select value={departmentCode} style={{ width: '100%' }} onChange={value => this.handleDepartmentChange(index, value)} placeholder="Select Department">
            {
              departments.map(department => <Option value={department.code} key={department.code}> {department.name}</Option>)
            }
          </Select>
        </Col>
        <Col>
          <Select value={facultyId} style={{ width: '100%' }} onChange={value => handleFacultyChange(index, value)} placeholder="Select Faculty">
            {
              facultiesPerDepartment.map(currentFaculty => <Option value={currentFaculty._id} key={currentFaculty._id}> {currentFaculty.name}</Option>)
            }
          </Select>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  departments: state.departments.departments,
  faculties: state.departments.faculties,
});
const mapDispatchToProps = { getAllFacultiesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(FacultySelection);
