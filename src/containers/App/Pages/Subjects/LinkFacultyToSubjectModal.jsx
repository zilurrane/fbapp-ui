import React, { Component } from 'react';
import { Modal, Tabs, Checkbox, Select } from 'antd';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { transformKeyToLabel } from '../../../../shared/helpers/array-helpers';
import { subjectParameters } from '../../../../shared/constants/common-constants';
import { getAllFacultiesByDepartmentCode } from '../../../../redux/actions/departmentActions';

const { TabPane } = Tabs;
const { Option } = Select;

class LinkFacultyToSubjectModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    selectedSubject: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parameters: PropTypes.arrayOf(string).isRequired,
    }).isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllFacultiesByDepartmentCode: PropTypes.func.isRequired,
    faculties: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  };

  constructor(props) {
    super(props);
    this.onParameterWiseFacultyCheckboxChangeEvent = this.onParameterWiseFacultyCheckboxChange.bind(this);
  }

  state = { isParameterWiseDifferentFaculty: false, departmentCode: undefined, facultyCode: undefined };

  onParameterWiseFacultyCheckboxChange(event) {
    const isParameterWiseDifferentFaculty = event.target.checked;
    this.setState({ isParameterWiseDifferentFaculty });
  }

  handleDepartmentChange = (value) => {
    this.setState({ departmentCode: value });
    this.props.getAllFacultiesByDepartmentCode(value);
  }

  handleFacultyChange = (value) => {
    this.setState({ facultyCode: value });
  }

  render() {
    const {
      visible, onCancel, onCreate, selectedSubject = { parameters: [] }, departments = [], faculties = {},
    } = this.props;
    const { departmentCode, facultyCode } = this.state;
    const facultiesPerDepartment = faculties[departmentCode] || [];

    return (
      <Modal
        title="Link Faculty to Subject"
        okText="Submit"
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
      >
        {
          selectedSubject.parameters.length > 1 &&
          <Checkbox onChange={this.onParameterWiseFacultyCheckboxChangeEvent}>Parameter-wise different faculty</Checkbox>
        }
        <Tabs size="small">
          {
            this.state.isParameterWiseDifferentFaculty ?
              selectedSubject.parameters.map(parameter => (
                <TabPane tab={transformKeyToLabel(parameter, { array: subjectParameters })} key={parameter}>
                  {parameter}
                </TabPane>
              ))
              :
              <TabPane tab={selectedSubject.parameters.map(parameter => transformKeyToLabel(parameter, { array: subjectParameters })).join('/')} key="All">
                <Row>
                  <Col>
                    <Select value={departmentCode} style={{ width: '100%' }} onChange={this.handleDepartmentChange} placeholder="Select Department">
                      {
                        departments.map(department => <Option value={department.code} key={department.code}> {department.name}</Option>)
                      }
                    </Select>
                  </Col>
                  <Col>
                    <Select value={facultyCode} style={{ width: '100%' }} onChange={this.handleFacultyChange} placeholder="Select Department">
                      {
                        // eslint-disable-next-line no-underscore-dangle
                        facultiesPerDepartment.map(faculty => <Option value={faculty._id} key={faculty._id}> {faculty.name}</Option>)
                      }
                    </Select>
                  </Col>
                </Row>
              </TabPane>
          }
        </Tabs>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  departments: state.departments.departments,
  faculties: state.departments.faculties,
});
const mapDispatchToProps = { getAllFacultiesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(LinkFacultyToSubjectModal);
