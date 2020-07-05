/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { createFaculty, updateFaculty } from '../../../../redux/actions/departmentActions';
import FacultiesTable from './FacultiesTable';
import AddEditFacultyFormModal from './AddEditFacultyFormModal';

class FacultiesCard extends Component {
  static propTypes = {
    createFaculty: PropTypes.func.isRequired,
    updateFaculty: PropTypes.func.isRequired,
    departmentCode: PropTypes.string.isRequired,
  };

  state = { isAddEditFacultyModalVisible: false, selectedFaculty: null };

  showAddEditFacultyModal = (selctedFacultyParam) => {
    if (selctedFacultyParam) {
      const { name, email, qualification } = selctedFacultyParam;
      this.setState({ isAddEditFacultyModalVisible: true, selectedFaculty: selctedFacultyParam });
      this.addEditFacultyFormRef.props.form.setFieldsValue({ name, email, qualification });
    } else {
      this.setState({ isAddEditFacultyModalVisible: true, selectedFaculty: null });
    }
  };

  handleAddEditFacultyModalSubmit = () => {
    const { form } = this.addEditFacultyFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (this.state.selectedFaculty) {
        this.props.updateFaculty({
          query: { _id: this.state.selectedFaculty._id },
          data: { ...this.state.selectedFaculty, ...values },
        });
      } else {
        this.props.createFaculty({ ...values, departmentCode: this.props.departmentCode });
      }
      form.resetFields();
      this.setState({ isAddEditFacultyModalVisible: false, selectedFaculty: null });
    });
  };

  handleAddEditFacultyModalCancel = () => {
    this.setState({ isAddEditFacultyModalVisible: false, selectedFaculty: null });
  };

  saveAddEditFacultyFormRef = (formRef) => {
    console.log('formRef', formRef);
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
                      <Button className="card__actions" type="primary" icon={<PlusOutlined />} onClick={() => this.showAddEditFacultyModal()}>
                        Add Faculty
                      </Button>
                    </div>
                    <FacultiesTable showAddEditFacultyModal={this.showAddEditFacultyModal} departmentCode={departmentCode} />
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
const mapDispatchToProps = { createFaculty, updateFaculty };
export default connect(mapStateToProps, mapDispatchToProps)(FacultiesCard);
