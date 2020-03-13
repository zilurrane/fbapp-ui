/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Select, List, Avatar, Alert } from 'antd';
import { getAllFacultiesByDepartmentCodeClassCode } from '../../../redux/actions/departmentActions';
import { getAllFeedbackParameters, submitFeedback } from '../../../redux/actions/feedbackActions';
import FeedbackFormTable from './FeedbackFormTable';

const { Option } = Select;

const getSubjectParametersArrayAsString = parameters => parameters.join('/');

class FeedbackFormBody extends Component {
  static propTypes = {
    loggedInUserInfo: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      departmentCode: PropTypes.string.isRequired,
      classCode: PropTypes.string.isRequired,
    }).isRequired,
    faculties: PropTypes.arrayOf(PropTypes.object).isRequired,
    feedbackParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllFacultiesByDepartmentCodeClassCode: PropTypes.func.isRequired,
    getAllFeedbackParameters: PropTypes.func.isRequired,
    submitFeedback: PropTypes.func.isRequired,
  };

  state = { selectedFaculty: undefined };

  componentDidMount() {
    this.props.getAllFacultiesByDepartmentCodeClassCode(this.props.loggedInUserInfo.departmentCode, this.props.loggedInUserInfo.classCode, this.props.loggedInUserInfo._id);
    this.props.getAllFeedbackParameters();
  }

  onFacultyChange = (value) => {
    const selectedFaculty = this.props.faculties.find(faculty => faculty.faculty.id === value);
    this.setState({ selectedFaculty });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const selectedFaculty = prevState.selectedFaculty ? nextProps.faculties.find(faculty => faculty.faculty.id === prevState.selectedFaculty.faculty.id) : undefined;
    return {
      selectedFaculty,
    };
  }

  render() {
    const { faculties } = this.props;
    return (
      <Fragment>
        <Row className="feedback-form-head">
          <Col sm={1} />
          <Col sm={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select faculty"
              onChange={this.onFacultyChange}
            >
              {
                faculties.map((faculty) => {
                  const optionStyle = { backgroundColor: faculty.isFeedbackSubmitted ? '#d9f8e3' : 'transparent' };
                  return (
                    <Option value={faculty.faculty.id} key={faculty.faculty.id} style={optionStyle}>
                      {faculty.faculty.name}
                    </Option>
                  );
                })
              }
            </Select>
          </Col>
          {
            this.state.selectedFaculty && this.state.selectedFaculty.subjects &&
            <Fragment>
              <Col sm={1} />
              <Col sm={8}>
                <List
                  size="small"
                  dataSource={this.state.selectedFaculty.subjects}
                  renderItem={item => <List.Item>{item.name} ({getSubjectParametersArrayAsString(item.parameters)})</List.Item>}
                />
              </Col>
              <Col sm={3} />
              <Col sm={3}>
                <Avatar size={100} src="https://avatars3.githubusercontent.com/u/9009188?s=200&v=4" />
              </Col>
            </Fragment>
          }
        </Row>
        {
          this.state.selectedFaculty && this.state.selectedFaculty.isFeedbackSubmitted ?
            <Row className="feedback-form-message">
              <Col>
                <Alert message={`You have already submitted your feedback for ${this.state.selectedFaculty.faculty.name}`} type="success" showIcon />
              </Col>
            </Row>
            :
            (
              <FeedbackFormTable
                loggedInUserInfo={this.props.loggedInUserInfo}
                feedbackParameters={this.props.feedbackParameters}
                selectedFaculty={this.state.selectedFaculty}
                submitFeedback={this.props.submitFeedback}
              />
            )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  faculties: (state.departments.classFaculties[props.loggedInUserInfo.departmentCode] || {})[props.loggedInUserInfo.classCode] || [],
  feedbackParameters: state.feedback.feedbackParameters || [],
});
const mapDispatchToProps = { getAllFacultiesByDepartmentCodeClassCode, getAllFeedbackParameters, submitFeedback };
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackFormBody);
