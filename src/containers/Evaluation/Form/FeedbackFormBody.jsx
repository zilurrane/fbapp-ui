/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row, Select } from 'antd';
import { getAllFacultiesByDepartmentCode } from '../../../redux/actions/departmentActions';

const { Option } = Select;

class FeedbackFormBody extends Component {
  static propTypes = {
    loggedInUserInfo: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      departmentCode: PropTypes.string.isRequired,
    }).isRequired,
    faculties: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllFacultiesByDepartmentCode: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllFacultiesByDepartmentCode(this.props.loggedInUserInfo.departmentCode);
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({ faculties: state.departments.faculties[props.loggedInUserInfo.departmentCode] || [] });
const mapDispatchToProps = { getAllFacultiesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackFormBody);
