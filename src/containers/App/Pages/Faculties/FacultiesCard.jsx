import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Select, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllDepartments, getAllClassesByDepartmentCode, createFaculty } from '../../../../redux/actions/departmentActions';
import FacultiesTable from './FacultiesTable';
import AddEditFacultyFormModal from './AddEditFacultyFormModal';

const { Option } = Select;

class FacultiesCard extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    getAllClassesByDepartmentCode: PropTypes.func.isRequired,
    createFaculty: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  };

  state = { departmentCode: undefined, classCode: undefined, isAddEditFacultyModalVisible: false };

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

  showAddEditFacultyModal = () => {
    this.setState({ isAddEditFacultyModalVisible: true });
  };

  handleAddEditFacultyModalSubmit = () => {
    const { form } = this.addEditFacultyFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.createFaculty({ ...values, departmentCode: this.state.departmentCode, classCode: this.state.classCode });
      form.resetFields();
      this.setState({ isAddEditFacultyModalVisible: false });
    });
  };

  handleAddEditFacultyModalCancel = () => {
    this.setState({ isAddEditFacultyModalVisible: false });
  };

  saveAddEditFacultyFormRef = (formRef) => {
    this.addEditFacultyFormRef = formRef;
  };

  render() {
    const { departments, classes } = this.props;
    const { classCode, departmentCode } = this.state;
    const classesByDepartmentCode = classes[departmentCode] || [];
    return (
      <Fragment>
        <Col md={12}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <div className="card__title">
                    <h5 className="bold-text">Manage Faculties</h5>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row className="department-faculty-select-container">
                    <Col md={4} sm={12}>
                      <Select value={departmentCode} style={{ width: '100%' }} onChange={this.handleDepartmentChange} placeholder="Select Department">
                        {
                          departments.map(department => <Option value={department.code} key={department.code}> {department.name}</Option>)
                        }
                      </Select>
                    </Col>
                    <br />
                    <br />
                    <Col md={4} sm={12}>
                      <Select value={classCode} style={{ width: '100%' }} onChange={this.handleClassChange} placeholder="Select Class">
                        {
                          classesByDepartmentCode.map(departmentClass => <Option value={departmentClass.code} key={departmentClass.code}> {departmentClass.name}</Option>)
                        }
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {
                        departmentCode && classCode &&
                        <div>
                          <div className="card__title">
                            <h5 className="bold-text">&nbsp;</h5>
                            <Button className="card__actions" type="primary" onClick={() => this.showAddEditFacultyModal()}>
                              Add
                            </Button>
                          </div>
                          <FacultiesTable departmentCode={departmentCode} classCode={classCode} />
                        </div>
                      }
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <AddEditFacultyFormModal
          wrappedComponentRef={this.saveAddEditFacultyFormRef}
          visible={this.state.isAddEditFacultyModalVisible}
          onCancel={this.handleAddEditFacultyModalCancel}
          onCreate={this.handleAddEditFacultyModalSubmit}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ departments: state.departments.departments, classes: state.departments.classes || {} });
const mapDispatchToProps = { getAllDepartments, getAllClassesByDepartmentCode, createFaculty };
export default connect(mapStateToProps, mapDispatchToProps)(FacultiesCard);
