import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio } from 'antd';

const AddEditTenantForm = ({
  visible, onCreate, onCancel, isEditView,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={isEditView ? 'Update Tenant' : 'Add Tenant'}
      okText={isEditView ? 'Update' : 'Add'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
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
          name="code"
          label="Code"
          rules={[
            {
              required: true,
              message: 'Please enter tenant code!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter tenant name!',
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

AddEditTenantForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditView: PropTypes.bool.isRequired,
};

export default AddEditTenantForm;
