import React from 'react';
import { Modal, Form, Input } from 'antd';

const AddEditClassFormModal = ({
  visible, onCancel, onCreate, selectedDepartment, selectedClass, isEditView,
}) => {
  const [form] = Form.useForm();

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
      title={isEditView ? 'Update Class' : 'Add Class'}
      okText={isEditView ? 'Update' : 'Add'}
      visible={visible}
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
        {...formItemLayout}
        name="add_edit_class_form_modal"
        initialValues={selectedClass}
      >
        <Form.Item label="Department">
          <span className="ant-form-text">{selectedDepartment.name}</span>
        </Form.Item>
        <Form.Item
          name="code"
          label="Code"
          rules={[{ required: true, message: 'Please input the class code!' }]}
        >
          <Input disabled={isEditView} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the class name!' }]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditClassFormModal;
