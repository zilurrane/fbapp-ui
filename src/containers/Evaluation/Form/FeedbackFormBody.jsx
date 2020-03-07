/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Select, List, Avatar } from 'antd';
import { getAllFacultiesByDepartmentCodeClassCode } from '../../../redux/actions/departmentActions';
import { getAllFeedbackParameters } from '../../../redux/actions/feedbackActions';
import FeedbackFormTable from './FeedbackFormTable';

const { Option } = Select;

class FeedbackFormBody extends Component {
  static propTypes = {
    loggedInUserInfo: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      departmentCode: PropTypes.string.isRequired,
      classCode: PropTypes.string.isRequired,
    }).isRequired,
    faculties: PropTypes.arrayOf(PropTypes.object).isRequired,
    feedbackParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllFacultiesByDepartmentCodeClassCode: PropTypes.func.isRequired,
    getAllFeedbackParameters: PropTypes.func.isRequired,
  };

  state = { selectedFaculty: undefined };

  componentDidMount() {
    this.props.getAllFacultiesByDepartmentCodeClassCode(this.props.loggedInUserInfo.departmentCode, this.props.loggedInUserInfo.classCode);
    this.props.getAllFeedbackParameters();
  }

  onChange = (value) => {
    const selectedFaculty = this.props.faculties.find(faculty => faculty.faculty.id === value);
    this.setState({ selectedFaculty });
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
              onChange={this.onChange}
            >
              {
                faculties.map(faculty => (
                  <Option value={faculty.faculty.id} key={faculty.faculty.id}>
                    {faculty.faculty.name}
                  </Option>
                ),
                )
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
                  renderItem={item => <List.Item>{item.name}</List.Item>}
                />
              </Col>
              <Col sm={3} />
              <Col sm={3}>
                <Avatar size={100} src="https://avatars3.githubusercontent.com/u/9009188?s=200&v=4" />
              </Col>
            </Fragment>
          }
        </Row>
        <FeedbackFormTable feedbackParameters={this.props.feedbackParameters} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  faculties: (state.departments.classFaculties[props.loggedInUserInfo.departmentCode] || {})[props.loggedInUserInfo.classCode] || [],
  feedbackParameters: state.feedback.feedbackParameters || [],
});
const mapDispatchToProps = { getAllFacultiesByDepartmentCodeClassCode, getAllFeedbackParameters };
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackFormBody);
