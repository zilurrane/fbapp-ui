import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';

class AddEditFacultyFormModal extends Component {
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
        title="Add Faculty"
        okText="Submit"
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Id">
            {getFieldDecorator('id', {
              rules: [{ required: true, message: 'Please input the faculty id!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input the faculty name!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input the faculty email address!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Qualification">
            {getFieldDecorator('qualification', {
              rules: [{ required: true, message: 'Please input the faculty qualification!' }],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'add_edit_faculty_form' })(AddEditFacultyFormModal);
