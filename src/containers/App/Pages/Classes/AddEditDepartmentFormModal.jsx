import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

class AddEditDepartmentFormModal extends Component {
  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return (
      <Modal
        title="Add Department"
        okText="Submit"
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Code">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Please input the department code!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input the department name!' }],
            })(<Input type="textarea" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'form_in_modal' })(AddEditDepartmentFormModal);
