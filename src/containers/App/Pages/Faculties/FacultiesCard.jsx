import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Select, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllDepartments, createFaculty } from '../../../../redux/actions/departmentActions';
import FacultiesTable from './FacultiesTable';
import AddEditFacultyFormModal from './AddEditFacultyFormModal';

const { Option } = Select;

class FacultiesCard extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    createFaculty: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = { departmentCode: undefined, isAddEditFacultyModalVisible: false };

  componentDidMount() {
    this.props.getAllDepartments();
  }

  handleDepartmentChange = (value) => {
    this.setState({ departmentCode: value });
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
      this.props.createFaculty({ ...values, departmentCode: this.state.departmentCode });
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
    const { departments } = this.props;
    const { departmentCode } = this.state;
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
                  </Row>
                  <Row>
                    <Col>
                      {
                        departmentCode &&
                        <div>
                          <div className="card__title">
                            <h5 className="bold-text">&nbsp;</h5>
                            <Button className="card__actions" type="primary" onClick={() => this.showAddEditFacultyModal()}>
                              Add
                            </Button>
                          </div>
                          <FacultiesTable departmentCode={departmentCode} />
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

const mapStateToProps = state => ({ departments: state.departments.departments });
const mapDispatchToProps = { getAllDepartments, createFaculty };
export default connect(mapStateToProps, mapDispatchToProps)(FacultiesCard);
