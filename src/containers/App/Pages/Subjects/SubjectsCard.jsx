import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Select, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllDepartments, getAllClassesByDepartmentCode, createSubject } from '../../../../redux/actions/departmentActions';
import SubjectsTable from './SubjectsTable';
import AddEditSubjectFormModal from './AddEditSubjectFormModal';

const { Option } = Select;

class SubjectsCard extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    getAllClassesByDepartmentCode: PropTypes.func.isRequired,
    createSubject: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  };

  state = { departmentCode: undefined, classCode: undefined, isAddEditSubjectModalVisible: false };

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

  showAddEditSubjectModal = () => {
    this.setState({ isAddEditSubjectModalVisible: true });
  };

  handleAddEditSubjectModalSubmit = () => {
    const { form } = this.addEditSubjectFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
      this.props.createSubject({ ...values, departmentCode: this.state.departmentCode, classCode: this.state.classCode });
      form.resetFields();
      this.setState({ isAddEditSubjectModalVisible: false });
    });
  };

  handleAddEditSubjectModalCancel = () => {
    this.setState({ isAddEditSubjectModalVisible: false });
  };

  saveAddEditSubjectFormRef = (formRef) => {
    this.addEditSubjectFormRef = formRef;
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
                    <h5 className="bold-text">Manage Subjects</h5>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row className="department-subject-select-container">
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
                            <Button className="card__actions" type="primary" onClick={() => this.showAddEditSubjectModal()}>
                              Add
                            </Button>
                          </div>
                          <SubjectsTable departmentCode={departmentCode} classCode={classCode} />
                        </div>
                      }
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <AddEditSubjectFormModal
          wrappedComponentRef={this.saveAddEditSubjectFormRef}
          visible={this.state.isAddEditSubjectModalVisible}
          onCancel={this.handleAddEditSubjectModalCancel}
          onCreate={this.handleAddEditSubjectModalSubmit}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ departments: state.departments.departments, classes: state.departments.classes || {} });
const mapDispatchToProps = { getAllDepartments, getAllClassesByDepartmentCode, createSubject };
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsCard);
