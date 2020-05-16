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

  state = { isParameterWiseDifferentFaculty: false, faculty: [{}] };

  /*
  static getDerivedStateFromProps(nextProps) {
    let isParameterWiseDifferentFaculty = false;
    if (nextProps.linkedFaculties && nextProps.linkedFaculties.length > 0) {
      const facultyId = nextProps.linkedFaculties[0].faculty._id;
      const differentFaculty = nextProps.linkedFaculties.find(linkedFaculty => linkedFaculty.faculty._id !== facultyId);
      if (differentFaculty && differentFaculty._id) {
        isParameterWiseDifferentFaculty = true;
      }
    }
    return {
      isParameterWiseDifferentFaculty,
    };
  }
  */

  onParameterWiseFacultyCheckboxChange(event) {
    const isParameterWiseDifferentFaculty = event.target.checked;
    this.setState({ isParameterWiseDifferentFaculty });
  }

  handleFacultyChange = (index, value) => {
    const faculty = [{ [index]: { ...this.state.faculty[index], facultyId: value } }];
    this.setState({ faculty });
  }

  handleDepartmentChange = (index, value) => {
    const faculty = [{ [index]: { departmentCode: value } }];
    console.log('faculty', faculty);
    this.setState({ faculty });
  }

  linkFacultyToSubject = () => {
    if (this.state.isParameterWiseDifferentFaculty) {
      // TEST
    } else {
      const subjectFacultyCombination = { subject: this.props.selectedSubject._id, faculty: this.state.faculty[0].facultyId };
      const request = this.props.selectedSubject.parameters.map(parameter => ({ ...subjectFacultyCombination, parameter }));
      this.props.linkFacultyToSubject(request);
    }
    this.props.onCreate();
  }

  render() {
    const {
      visible, onCancel, selectedSubject = { parameters: [] }, linkedFaculties,
    } = this.props;

    // eslint-disable-next-line no-console
    console.log(linkedFaculties, this.state.isParameterWiseDifferentFaculty);
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
              selectedSubject.parameters.map(parameter => (
                <TabPane tab={transformKeyToLabel(parameter, { array: subjectParameters })} key={parameter}>
                  <FacultySelection />
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
  linkedFaculties: state.departments.subjectFacultyLinks[(props.selectedSubject || {})._id],
});
const mapDispatchToProps = { linkFacultyToSubject };
export default connect(mapStateToProps, mapDispatchToProps)(LinkFacultyToSubjectModal);
