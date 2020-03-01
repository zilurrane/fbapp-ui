/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';
import { getAllFacultiesByDepartmentCode } from '../../../redux/actions/departmentActions';
import { getAllFeedbackParameters } from '../../../redux/actions/feedbackActions';
import FeedbackFormTable from './FeedbackFormTable';

const { Option } = Select;

class FeedbackFormBody extends Component {
  static propTypes = {
    loggedInUserInfo: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      departmentCode: PropTypes.string.isRequired,
    }).isRequired,
    faculties: PropTypes.arrayOf(PropTypes.object).isRequired,
    feedbackParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllFacultiesByDepartmentCode: PropTypes.func.isRequired,
    getAllFeedbackParameters: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllFacultiesByDepartmentCode(this.props.loggedInUserInfo.departmentCode);
    this.props.getAllFeedbackParameters();
  }

  onChange = value => console.log(value);

  render() {
    const { faculties } = this.props;
    return (
      <Fragment>
        <Row>
          <Col sm={8}>
            <Select
              style={{ width: '100%' }}
              showSearch
              placeholder="Select faculty"
              onChange={this.onChange}
            >
              {
                faculties.map(faculty => <Option value={faculty._id} key={faculty._id}>{faculty.name}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <FeedbackFormTable feedbackParameters={this.props.feedbackParameters} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({ faculties: state.departments.faculties[props.loggedInUserInfo.departmentCode] || [], feedbackParameters: state.feedback.feedbackParameters || [] });
const mapDispatchToProps = { getAllFacultiesByDepartmentCode, getAllFeedbackParameters };
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackFormBody);
