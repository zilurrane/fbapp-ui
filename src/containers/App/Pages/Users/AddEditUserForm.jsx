import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio } from 'antd';

const AddEditUserForm = ({
  visible, onCreate, onCancel, isEditView,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={isEditView ? 'Update User' : 'Add User'}
      okText={isEditView ? 'Update' : 'Add'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          isActive: 'true',
        }}
      >
        <Form.Item
          name="userName"
          label="User Name"
          rules={[
            {
              required: true,
              message: 'Please enter user name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: 'Please enter user role!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-Mail"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please enter tenant e-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="isActive">
          <Radio.Group>
            <Radio value="true">Active</Radio>
            <Radio value="false">In-Active</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

AddEditUserForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditView: PropTypes.bool.isRequired,
};

export default AddEditUserForm;
