import React, { Component, Fragment } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createFaculty } from '../../../../redux/actions/departmentActions';
import FacultiesTable from './FacultiesTable';
import AddEditFacultyFormModal from './AddEditFacultyFormModal';

class FacultiesCard extends Component {
  static propTypes = {
    createFaculty: PropTypes.func.isRequired,
    departmentCode: PropTypes.string.isRequired,
  };

  state = { isAddEditFacultyModalVisible: false };

  showAddEditFacultyModal = () => {
    this.setState({ isAddEditFacultyModalVisible: true });
  };

  handleAddEditFacultyModalSubmit = () => {
    const { form } = this.addEditFacultyFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.createFaculty({ ...values, departmentCode: this.props.departmentCode });
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
    const { departmentCode } = this.props;
    return (
      <Fragment>
        <Col span={24}>
          <Card>
            <Row>
              <Col span={24}>
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

const mapStateToProps = () => ({});
const mapDispatchToProps = { createFaculty };
export default connect(mapStateToProps, mapDispatchToProps)(FacultiesCard);
