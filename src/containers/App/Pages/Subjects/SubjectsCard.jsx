import React, { Component, Fragment } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllDepartments, getAllClassesByDepartmentCode, createSubject } from '../../../../redux/actions/departmentActions';
import SubjectsTable from './SubjectsTable';
import AddEditSubjectFormModal from './AddEditSubjectFormModal';

class SubjectsCard extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
    createSubject: PropTypes.func.isRequired,
  };

  state = { isAddEditSubjectModalVisible: false };

  showAddEditSubjectModal = () => {
    this.setState({ isAddEditSubjectModalVisible: true });
  };

  handleAddEditSubjectModalSubmit = () => {
    const { form } = this.addEditSubjectFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.createSubject({ ...values, departmentCode: this.props.departmentCode, classCode: this.props.classCode });
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
    const { classCode, departmentCode } = this.props;
    return (
      <Fragment>
        <Card>
          <Row>
            <Col span={24}>
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
        </Card>
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

const mapStateToProps = () => ({});
const mapDispatchToProps = { getAllDepartments, getAllClassesByDepartmentCode, createSubject };
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsCard);
