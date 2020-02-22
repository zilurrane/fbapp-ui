import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { getAllSubjectsByDepartmentCodeClassCode, getFacultiesLinkedToSubject } from '../../../../redux/actions/departmentActions';
import { transformKeyToLabel } from '../../../../shared/helpers/array-helpers';
import { subjectParameters } from '../../../../shared/constants/common-constants';
import LinkFacultyToSubjectModal from './LinkFacultyToSubjectModal';

class SubjectsTable extends Component {
  static propTypes = {
    getAllSubjectsByDepartmentCodeClassCode: PropTypes.func.isRequired,
    getFacultiesLinkedToSubject: PropTypes.func.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
  };

  state = { linkFacultyToSubjectModalVisible: false, selectedSubject: undefined };

  componentDidMount() {
    this.props.getAllSubjectsByDepartmentCodeClassCode(this.props.departmentCode, this.props.classCode);
  }

  componentDidUpdate(prevProps) {
    if (!(prevProps.departmentCode === this.props.departmentCode && prevProps.classCode === this.props.classCode)) {
      this.props.getAllSubjectsByDepartmentCodeClassCode(this.props.departmentCode, this.props.classCode);
    }
  }

  showLinkFacultyToSubjectModal = (selectedSubject) => {
    // eslint-disable-next-line no-underscore-dangle
    this.props.getFacultiesLinkedToSubject(selectedSubject._id);
    this.setState({ linkFacultyToSubjectModalVisible: true, selectedSubject });
  };

  handleLinkFacultyToSubjectModalSubmit = () => {
    this.setState({ linkFacultyToSubjectModalVisible: false });
  };

  handleLinkFacultyToSubjectModalCancel = () => {
    this.setState({ linkFacultyToSubjectModalVisible: false });
  };

  render() {
    const { subjects } = this.props;
    return (
      <Fragment>
        <Table size="sm" hover striped>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Parameters</th>
              <th className="text-center">Status</th>
              <th className="text-center">Faculty</th>
            </tr>
          </thead>
          <tbody>
            {
              subjects.map((subject, index) => (
                <tr key={index + 1}>
                  <th scope="row" className="text-center">{index + 1}</th>
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>{transformKeyToLabel(subject.parameters, { array: subjectParameters, isCsv: true })}</td>
                  <td className="text-center">{subject.isActive ? 'Active' : 'In-Active'}</td>
                  <td className="text-center">
                    <Button type="link" onClick={() => this.showLinkFacultyToSubjectModal(subject)}>
                      Link
                    </Button>
                  </td>
                </tr>
              ))
            }
            {
              subjects.length === 0 &&
              <tr>
                <td colSpan="6">No subjects found!</td>
              </tr>
            }
          </tbody>
        </Table>
        <LinkFacultyToSubjectModal
          visible={this.state.linkFacultyToSubjectModalVisible}
          selectedSubject={this.state.selectedSubject}
          onCancel={this.handleLinkFacultyToSubjectModalCancel}
          onCreate={this.handleLinkFacultyToSubjectModalSubmit}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({ subjects: (state.departments.subjects[props.departmentCode] || {})[props.classCode] || [] });
const mapDispatchToProps = { getAllSubjectsByDepartmentCodeClassCode, getFacultiesLinkedToSubject };
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsTable);
