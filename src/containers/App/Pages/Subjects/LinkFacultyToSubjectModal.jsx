/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Modal, Tabs, Checkbox } from 'antd';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { transformKeyToLabel } from '../../../../shared/helpers/array-helpers';
import { subjectParameters } from '../../../../shared/constants/common-constants';
import { linkFacultyToSubject } from '../../../../redux/actions/departmentActions';
import FacultySelection from './FacultySelection';

const { TabPane } = Tabs;

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
    linkedFaculties: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.onParameterWiseFacultyCheckboxChangeEvent = this.onParameterWiseFacultyCheckboxChange.bind(this);
    this.handleFacultyChangeEvent = this.handleFacultyChange.bind(this);
    this.handleDepartmentChangeEvent = this.handleDepartmentChange.bind(this);
  }

  state = { isParameterWiseDifferentFaculty: false, faculty: [{}], linkedFaculties: [] };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.linkedFaculties[0] || !prevState.linkedFaculties[0] || nextProps.linkedFaculties[0].subject !== prevState.linkedFaculties[0].subject) {
      let isParameterWiseDifferentFaculty = false;
      let faculty = [{}];
      if (nextProps.linkedFaculties && nextProps.linkedFaculties.length > 0) {
        const facultyId = nextProps.linkedFaculties[0].faculty._id;
        const differentFaculty = nextProps.linkedFaculties.find(linkedFaculty => linkedFaculty.faculty._id !== facultyId);
        if (differentFaculty && differentFaculty._id) {
          isParameterWiseDifferentFaculty = true;
          faculty = nextProps.linkedFaculties.map(linkedFaculty => ({ departmentCode: linkedFaculty.faculty.departmentCode, facultyId: linkedFaculty.faculty._id }));
        } else {
          const linkedFaculty = nextProps.linkedFaculties[0];
          faculty = [{ departmentCode: linkedFaculty.faculty.departmentCode, facultyId: linkedFaculty.faculty._id }];
        }
      }
      return {
        isParameterWiseDifferentFaculty,
        faculty,
        linkedFaculties: nextProps.linkedFaculties,
      };
    }
    return null;
  }

  onParameterWiseFacultyCheckboxChange(event) {
    const isParameterWiseDifferentFaculty = event.target.checked;
    let faculty = [{}];
    if (isParameterWiseDifferentFaculty) {
      faculty = this.props.linkedFaculties.map(linkedFaculty => ({ departmentCode: linkedFaculty.faculty.departmentCode, facultyId: linkedFaculty.faculty._id }));
    } else {
      const linkedFaculty = this.props.linkedFaculties[0];
      faculty = [{ departmentCode: linkedFaculty.faculty.departmentCode, facultyId: linkedFaculty.faculty._id }];
    }
    this.setState({ isParameterWiseDifferentFaculty, faculty });
  }

  getFacultySubjectLinkId = parameter => (this.props.linkedFaculties.find(faculty => faculty.parameter === parameter) || {})._id;

  handleFacultyChange = (index, value) => {
    let faculty = [];
    if (index === 0) {
      faculty = [{ ...this.state.faculty[index], facultyId: value }];
    } else {
      faculty = [...this.state.faculty];
      faculty[index] = { ...this.state.faculty[index], facultyId: value };
    }
    this.setState({ faculty });
  }

  handleDepartmentChange = (index, value) => {
    let faculty = [];
    if (index === 0) {
      faculty = [{ ...this.state.faculty[index], departmentCode: value }];
    } else {
      faculty = [...this.state.faculty];
      faculty[index] = { ...this.state.faculty[index], departmentCode: value };
    }
    this.setState({ faculty });
  }

  linkFacultyToSubject = () => {
    if (this.state.isParameterWiseDifferentFaculty) {
      // TEST
    } else {
      const subjectFacultyCombination = { subject: this.props.selectedSubject._id, faculty: this.state.faculty[0].facultyId };
      const request = this.props.selectedSubject.parameters.map(parameter => ({
        ...subjectFacultyCombination,
        parameter,
        id: this.getFacultySubjectLinkId(parameter),
      }));
      this.props.linkFacultyToSubject(request);
    }
    this.props.onCreate();
  }

  render() {
    const {
      visible, onCancel, selectedSubject = { parameters: [] }, linkedFaculties,
    } = this.props;

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
          <Checkbox checked={this.state.isParameterWiseDifferentFaculty} onChange={this.onParameterWiseFacultyCheckboxChangeEvent}>Parameter-wise different faculty</Checkbox>
        }
        <Tabs size="small">
          {
            this.state.isParameterWiseDifferentFaculty ?
              selectedSubject.parameters.map((parameter, index) => (
                <TabPane tab={transformKeyToLabel(parameter, { array: subjectParameters })} key={parameter}>
                  {
                    this.state.faculty[index] &&
                    <FacultySelection
                      index={index}
                      handleFacultyChange={this.handleFacultyChangeEvent}
                      handleDepartmentChange={this.handleDepartmentChangeEvent}
                      facultyId={this.state.faculty[index].facultyId}
                      departmentCode={this.state.faculty[index].departmentCode}
                    />
                  }
                </TabPane>
              ))
              :
              <TabPane tab={selectedSubject.parameters.map(parameter => transformKeyToLabel(parameter, { array: subjectParameters })).join('/')} key="All">
                <FacultySelection
                  index={0}
                  handleFacultyChange={this.handleFacultyChangeEvent}
                  handleDepartmentChange={this.handleDepartmentChangeEvent}
                  facultyId={this.state.faculty[0].facultyId}
                  departmentCode={this.state.faculty[0].departmentCode}
                />
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
  linkedFaculties: state.departments.subjectFacultyLinks[(props.selectedSubject || {})._id] || [],
});
const mapDispatchToProps = { linkFacultyToSubject };
export default connect(mapStateToProps, mapDispatchToProps)(LinkFacultyToSubjectModal);
