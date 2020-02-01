import React, { Fragment, Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Button } from 'antd';
import DepartmentsTable from './DepartmentsTable';
import AddEditDepartmentFormModal from './AddEditDepartmentFormModal';

class ClassesCard extends Component {
  state = { isAddEditDepartmentModalVisible: false };

  showAddEditDepartmentModal = () => {
    this.setState({
      isAddEditDepartmentModalVisible: true,
    });
  };

  handleAddEditDepartmentModalSubmit = () => {
    const { form } = this.addEditDepartmentFormRef.props;
    form.validateFields((err) => {
      if (err) {
        return;
      }
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

export default ClassesCard;
