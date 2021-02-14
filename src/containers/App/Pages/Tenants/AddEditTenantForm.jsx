import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio } from 'antd';

const AddEditTenantForm = ({
  visible, onSubmit, onCancel, isEditView, selectedTenant,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      isActive: selectedTenant.isActive ? 'true' : 'false',
      code: selectedTenant.code,
      name: selectedTenant.name,
      email: selectedTenant.email,
    });
  }, [selectedTenant]);
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
            onSubmit(values);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
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
          <Input disabled={isEditView} />
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

export default AddEditTenantForm;
