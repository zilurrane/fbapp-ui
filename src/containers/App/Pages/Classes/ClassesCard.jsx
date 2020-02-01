import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Button } from 'antd';
import { connect } from 'react-redux';
import DepartmentsTable from './DepartmentsTable';
import AddEditDepartmentFormModal from './AddEditDepartmentFormModal';
import { createDepartment } from '../../../../redux/actions/departmentActions';

class ClassesCard extends Component {
  static propTypes = {
    createDepartment: PropTypes.func.isRequired,
  };

  state = { isAddEditDepartmentModalVisible: false };

  showAddEditDepartmentModal = () => {
    this.setState({
      isAddEditDepartmentModalVisible: true,
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

  handleAddEditDepartmentModalCancel = () => {
    this.setState({
      isAddEditDepartmentModalVisible: false,
    });
  };

  saveAddEditDepartmentFormRef = (formRef) => {
    this.addEditDepartmentFormRef = formRef;
  };

  render() {
    return (
      <Fragment>
        <Col md={12}>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Manage Departments</h5>
                    <Button className="card__actions" type="primary" onClick={this.showAddEditDepartmentModal}>
                      Add
                    </Button>
                  </div>
                  <DepartmentsTable />
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Manage Classes</h5>
                  </div>
                  <DepartmentsTable />
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
      </Fragment>
    );
  }
}

const mapDispatchToProps = { createDepartment };
export default connect(null, mapDispatchToProps)(ClassesCard);
