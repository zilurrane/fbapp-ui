/* eslint-disable no-underscore-dangle */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Button, Tabs, Descriptions, Divider } from 'antd';
import { connect } from 'react-redux';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import AddEditDepartmentFormModal from './AddEditDepartmentFormModal';
import AddEditClassFormModal from './AddEditClassFormModal';
import { createDepartment, updateDepartment, getAllDepartments, createClass, updateClass } from '../../../../redux/actions/departmentActions';
import ClassesTable from './ClassesTable';

const { TabPane } = Tabs;

class ClassesCard extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    createDepartment: PropTypes.func.isRequired,
    updateDepartment: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    createClass: PropTypes.func.isRequired,
    updateClass: PropTypes.func.isRequired,
  };

  state = {
    isAddEditDepartmentModalVisible: false,
    isDepartmentEditView: false,
    isClassEditView: false,
    isAddEditClassModalVisible: false,
    selectedDepartment: {},
    selectedClass: {},
  };

  componentDidMount() {
    this.props.getAllDepartments();
  }

  showAddDepartmentModal = () => {
    this.setState({
      isAddEditDepartmentModalVisible: true,
      selectedDepartment: {},
      isDepartmentEditView: false,
    });
  };

  showEditDepartmentModal = (selectedDepartment) => {
    this.setState({
      isAddEditDepartmentModalVisible: true,
      selectedDepartment,
      isDepartmentEditView: true,
    });
  };

  openAddClassPopup = (department) => {
    this.setState({
      isAddEditClassModalVisible: true,
      isClassEditView: false,
      selectedDepartment: department,
      selectedClass: {},
    });
  };

  openEditClassPopup = (selectedDepartment, selectedClass) => {
    this.setState({
      isAddEditClassModalVisible: true,
      isClassEditView: true,
      selectedDepartment,
      selectedClass,
    });
  };

  handleAddEditDepartmentModalSubmit = (values) => {
    if (this.state.selectedDepartment) {
      this.props.updateDepartment({ query: { _id: this.state.selectedDepartment._id }, data: values });
    } else {
      this.props.createDepartment(values);
    }
    this.setState({ isAddEditDepartmentModalVisible: false });
  };

  handleAddEditClassModalSubmit = (values) => {
    if (this.state.isClassEditView) {
      this.props.updateClass({
        query: {
          _id: this.state.selectedClass._id,
          departmentCode: this.state.selectedDepartment.code,
        },
        data: values,
      });
    } else {
      this.props.createClass({ ...values, departmentCode: this.state.selectedDepartment.code });
    }
    this.setState({ isAddEditClassModalVisible: false });
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
                    <Button type="primary" className="card__actions" icon={<PlusOutlined />} onClick={this.showAddDepartmentModal}>
                      Add Department
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
                            <Button type="primary" className="float-right" icon={<EditOutlined />} onClick={() => this.showEditDepartmentModal(department)}>
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
                                <Button type="primary" className="card__actions" icon={<PlusOutlined />} onClick={() => this.openAddClassPopup(department)}>
                                  Add Class
                                </Button>
                              </div>
                              <ClassesTable departmentCode={department.code} openEditClassPopup={selectedClass => this.openEditClassPopup(department, selectedClass)} />
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
          key={Math.random()}
          visible={this.state.isAddEditDepartmentModalVisible}
          onCancel={this.handleAddEditDepartmentModalCancel}
          onCreate={values => this.handleAddEditDepartmentModalSubmit(values)}
          selectedDepartment={this.state.selectedDepartment}
          isEditView={this.state.isDepartmentEditView}
        />
        <AddEditClassFormModal
          key={Math.random()}
          visible={this.state.isAddEditClassModalVisible}
          onCancel={this.handleAddEditClassModalCancel}
          onCreate={values => this.handleAddEditClassModalSubmit(values)}
          selectedDepartment={this.state.selectedDepartment}
          selectedClass={this.state.selectedClass}
          isEditView={this.state.isClassEditView}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({ departments: state.departments.departments });
const mapDispatchToProps = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  createClass,
  updateClass,
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassesCard);
