/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Modal, Tabs, Checkbox } from 'antd';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { transformKeyToLabel } from '../../../../shared/helpers/array-helpers';
import { subjectParameters } from '../../../../shared/constants/common-constants';
import { getAllFacultiesByDepartmentCode, linkFacultyToSubject } from '../../../../redux/actions/departmentActions';
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
    getAllFacultiesByDepartmentCode: PropTypes.func.isRequired,
    linkedFaculties: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.onParameterWiseFacultyCheckboxChangeEvent = this.onParameterWiseFacultyCheckboxChange.bind(this);
  }

  state = { isParameterWiseDifferentFaculty: false };

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

  handleDepartmentChange = (value) => {
    this.props.getAllFacultiesByDepartmentCode(value);
  }

  handleFacultyChange = (value) => {
    this.setState({ faculty: value });
  }

  linkFacultyToSubject = () => {
    if (this.state.isParameterWiseDifferentFaculty) {
      // TEST
    } else {
      // eslint-disable-next-line no-underscore-dangle
      const subjectFacultyCombination = { subject: this.props.selectedSubject._id, faculty: this.state.faculty };
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
                <FacultySelection />
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
