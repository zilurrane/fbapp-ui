import React, { Component } from 'react';
import { Modal, Tabs, Checkbox, Select } from 'antd';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { transformKeyToLabel } from '../../../../shared/helpers/array-helpers';
import { subjectParameters } from '../../../../shared/constants/common-constants';
import { getAllFacultiesByDepartmentCode, linkFacultyToSubject } from '../../../../redux/actions/departmentActions';

const { TabPane } = Tabs;
const { Option } = Select;

class LinkFacultyToSubjectModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    linkFacultyToSubject: PropTypes.func.isRequired,
    selectedSubject: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      parameters: PropTypes.arrayOf(string).isRequired,
    }).isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllFacultiesByDepartmentCode: PropTypes.func.isRequired,
    faculties: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    linkedFaculties: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.onParameterWiseFacultyCheckboxChangeEvent = this.onParameterWiseFacultyCheckboxChange.bind(this);
  }

  state = { isParameterWiseDifferentFaculty: false, departmentCode: undefined, facultyId: undefined };

  onParameterWiseFacultyCheckboxChange(event) {
    const isParameterWiseDifferentFaculty = event.target.checked;
    this.setState({ isParameterWiseDifferentFaculty });
  }

  handleDepartmentChange = (value) => {
    this.setState({ departmentCode: value });
    this.props.getAllFacultiesByDepartmentCode(value);
  }

  handleFacultyChange = (value) => {
    this.setState({ facultyId: value });
  }

  linkFacultyToSubject = () => {
    if (this.state.isParameterWiseDifferentFaculty) {
      // TEST
    } else {
      // eslint-disable-next-line no-underscore-dangle
      const subjectFacultyCombination = { subjectId: this.props.selectedSubject._id, facultyId: this.state.facultyId };
      const request = this.props.selectedSubject.parameters.map(parameter => ({ ...subjectFacultyCombination, parameter }));
      this.props.linkFacultyToSubject(request);
    }
    this.props.onCreate();
  }

  render() {
    const {
      visible, onCancel, selectedSubject = { parameters: [] }, departments = [], faculties = {}, linkedFaculties,
    } = this.props;
    const { departmentCode, facultyId } = this.state;
    const facultiesPerDepartment = faculties[departmentCode] || [];
    // eslint-disable-next-line no-console
    console.log(linkedFaculties);
    return (
      <Modal
        title="Link Faculty to Subject"
        okText="Submit"
        visible={visible}
        onCancel={onCancel}
        onOk={this.linkFacultyToSubject}
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
                    <Select value={facultyId} style={{ width: '100%' }} onChange={this.handleFacultyChange} placeholder="Select Department">
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

const mapStateToProps = (state, props) => ({
  departments: state.departments.departments,
  faculties: state.departments.faculties,
  // eslint-disable-next-line no-underscore-dangle
  linkedFaculties: state.departments.subjectFacultyLinks[(props.selectedSubject || {})._id],
});
const mapDispatchToProps = { getAllFacultiesByDepartmentCode, linkFacultyToSubject };
export default connect(mapStateToProps, mapDispatchToProps)(LinkFacultyToSubjectModal);
