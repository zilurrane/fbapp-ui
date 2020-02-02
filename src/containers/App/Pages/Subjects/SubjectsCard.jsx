import React, { Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Select } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllDepartments, getAllClassesByDepartmentCode } from '../../../../redux/actions/departmentActions';

const { Option } = Select;

class SubjectsCard extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    getAllClassesByDepartmentCode: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = { departmentCode: undefined, classCode: undefined };

  componentDidMount() {
    this.props.getAllDepartments();
  }

  handleDepartmentChange = (value) => {
    this.setState({ departmentCode: value, classCode: undefined });
    this.props.getAllClassesByDepartmentCode(value);
  }

  handleClassChange = (value) => {
    this.setState({ classCode: value });
  }

  render() {
    const { departments, classes } = this.props;
    const { classCode, departmentCode } = this.state;
    const classesByDepartmentCode = classes[departmentCode] || [];
    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <div className="card__title">
                  <h5 className="bold-text">Manage Subjects</h5>
                </div>
              </Col>
            </Row>
            <Row className="margin-top-15">
              <Col>
                <Row>
                  <Col md={4} sm={12}>
                    <Select value={departmentCode} style={{ width: '100%' }} onChange={this.handleDepartmentChange} placeholder="Select Department">
                      {
                        departments.map(department => <Option value={department.code}> {department.name}</Option>)
                      }
                    </Select>
                  </Col>
                  <Col md={4} sm={12}>
                    <Select value={classCode} style={{ width: '100%' }} onChange={this.handleClassChange} placeholder="Select Class">
                      {
                        classesByDepartmentCode.map(department => <Option value={department.code}> {department.name}</Option>)
                      }
                    </Select>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({ departments: state.departments.departments, classes: state.departments.classes || {} });
const mapDispatchToProps = { getAllDepartments, getAllClassesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsCard);
