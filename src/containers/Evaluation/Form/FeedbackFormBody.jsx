/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';
import { getAllFacultiesByDepartmentCodeClassCode } from '../../../redux/actions/departmentActions';
import { getAllFeedbackParameters } from '../../../redux/actions/feedbackActions';
import FeedbackFormTable from './FeedbackFormTable';

const { Option } = Select;

const getSubjectParametersArrayAsString = parameters => parameters.join('/');

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

  componentDidMount() {
    this.props.getAllFacultiesByDepartmentCodeClassCode(this.props.loggedInUserInfo.departmentCode, this.props.loggedInUserInfo.classCode);
    this.props.getAllFeedbackParameters();
  }

  onChange = value => console.log(value);

  render() {
    const { faculties } = this.props;
    console.log(faculties);
    return (
      <Fragment>
        <Row>
          <Col sm={12}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select faculty"
              onChange={this.onChange}
            >
              {
                faculties.map(faculty => (
                  <Option value={`${faculty.faculty.id}_${faculty.subject.id}`} key={`${faculty.faculty.id}_${faculty.subject.id}`}>
                    {faculty.faculty.name} - {faculty.subject.code}({getSubjectParametersArrayAsString(faculty.subject.parameters)})
                  </Option>
                  ),
                )
              }
            </Select>
          </Col>
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
