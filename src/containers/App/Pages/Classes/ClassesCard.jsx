import React, { Fragment, Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Button, Modal } from 'antd';
import DepartmentsTable from './DepartmentsTable';

class ClassesCard extends Component {
  state = { isAddEditDepartmentModalVisible: false };

  showAddEditDepartmentModal = () => {
    this.setState({
      isAddEditDepartmentModalVisible: true,
    });
  };

  handleAddEditDepartmentModalSubmit = () => {
    this.setState({
      isAddEditDepartmentModalVisible: false,
    });
  };

  handleAddEditDepartmentModalCancel = () => {
    this.setState({
      isAddEditDepartmentModalVisible: false,
    });
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
        <Modal
          title="Add Department"
          okText="Submit"
          visible={this.state.isAddEditDepartmentModalVisible}
          onOk={this.handleAddEditDepartmentModalSubmit}
          onCancel={this.handleAddEditDepartmentModalCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Fragment>
    );
  }
}

export default ClassesCard;
