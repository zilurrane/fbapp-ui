import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Button, Tabs, Descriptions, Divider } from 'antd';
import { connect } from 'react-redux';
import AddEditDepartmentFormModal from './AddEditDepartmentFormModal';
import AddEditClassFormModal from './AddEditClassFormModal';
import { createDepartment, getAllDepartments, createClass } from '../../../../redux/actions/departmentActions';
import ClassesTable from './ClassesTable';

const { TabPane } = Tabs;

class ClassesCard extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    createDepartment: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    createClass: PropTypes.func.isRequired,
  };

  state = { isAddEditDepartmentModalVisible: false, isAddEditClassModalVisible: false, selectedDepartment: {} };

  componentDidMount() {
    this.props.getAllDepartments();
  }

  showAddEditDepartmentModal = () => {
    this.setState({
      isAddEditDepartmentModalVisible: true,
    });
  };

  showAddEditClassModal = (department) => {
    this.setState({
      isAddEditClassModalVisible: true,
      selectedDepartment: department,
    });
  };

  handleAddEditDepartmentModalSubmit = () => {
    const { form } = this.addEditDepartmentFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.createDepartment(values);
      form.resetFields();
      this.setState({ isAddEditDepartmentModalVisible: false });
    });
  };

  handleAddEditClassModalSubmit = () => {
    const { form } = this.addEditClassFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.createClass({ ...values, departmentCode: this.state.selectedDepartment.code });
      form.resetFields();
      this.setState({ isAddEditClassModalVisible: false });
    });
  };

  handleAddEditDepartmentModalCancel = () => {
    this.setState({
      isAddEditDepartmentModalVisible: false,
    });
  };

  handleAddEditClassModalCancel = () => {
    this.setState({
      isAddEditClassModalVisible: false,
    });
  };

  saveAddEditDepartmentFormRef = (formRef) => {
    this.addEditDepartmentFormRef = formRef;
  };

  saveAddEditClassFormRef = (formRef) => {
    this.addEditClassFormRef = formRef;
  };

  render() {
    const { departments } = this.props;
    return (
      <Fragment>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Manage Departments</h5>
                    <Button className="card__actions" type="primary" onClick={this.showAddEditDepartmentModal}>
                      Add
                    </Button>
                  </div>
                  <Tabs tabPosition="top">
                    {departments.map(department => (
                      <TabPane tab={`${department.name}`} key={department.code}>
                        <Row>
                          <Col md={10}>
                            <Descriptions>
                              <Descriptions.Item label="Code">{department.code}</Descriptions.Item>
                              <Descriptions.Item label="Name">{department.name}</Descriptions.Item>
                            </Descriptions>
                          </Col>
                          <Col md={2}>
                            <Button className="float-right" type="primary" onClick={this.showAddEditDepartmentModal}>
                              Edit Department
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Divider />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>
                              <div className="card__title">
                                <h5 className="bold-text">Manage Classes</h5>
                                <Button className="card__actions" type="primary" onClick={() => this.showAddEditClassModal(department)}>
                                  Add
                                </Button>
                              </div>
                              <ClassesTable departmentCode={department.code} />
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    ))}
                  </Tabs>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <AddEditDepartmentFormModal
          wrappedComponentRef={this.saveAddEditDepartmentFormRef}
          visible={this.state.isAddEditDepartmentModalVisible}
          onCancel={this.handleAddEditDepartmentModalCancel}
          onCreate={this.handleAddEditDepartmentModalSubmit}
        />
        <AddEditClassFormModal
          wrappedComponentRef={this.saveAddEditClassFormRef}
          visible={this.state.isAddEditClassModalVisible}
          onCancel={this.handleAddEditClassModalCancel}
          onCreate={this.handleAddEditClassModalSubmit}
          selectedDepartment={this.state.selectedDepartment}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({ departments: state.departments.departments });
const mapDispatchToProps = { getAllDepartments, createDepartment, createClass };
export default connect(mapStateToProps, mapDispatchToProps)(ClassesCard);
