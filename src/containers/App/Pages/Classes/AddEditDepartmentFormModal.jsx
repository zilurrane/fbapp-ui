import React from 'react';
import { Form, Modal, Input } from 'antd';

const AddEditDepartmentFormModal = ({
  visible, onCancel, onCreate, selectedDepartment, isEditView,
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
      visible={visible}
      title={isEditView ? 'Update Department' : 'Add Department'}
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
        {...formItemLayout}
        form={form}
        name="add_edit_department_form_modal"
        initialValues={selectedDepartment}
      >
        <Form.Item
          name="code"
          label="Code"
          rules={
            [
              {
                required: true,
                message: 'Please input the department code!',
              },
            ]
          }
        >
          <Input disabled={isEditView} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the department name!',
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditDepartmentFormModal;
