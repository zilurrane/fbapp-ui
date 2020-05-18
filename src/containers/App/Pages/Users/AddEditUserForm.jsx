import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio, Select } from 'antd';
import { userShape } from '../../../../shared/shapes';
import { getAccessibleUserRoles } from '../../../../shared/helpers/common-helpers';
import { formItemLayout } from '../../../../shared/constants/layouts';

const { Option } = Select;

const AddEditUserForm = ({
  visible, onCreate, onCancel, isEditView, loggedInUserInfo, selectedUser,
}) => {
  const [form] = Form.useForm();
  const userRoles = getAccessibleUserRoles(loggedInUserInfo.role);

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
        {...formItemLayout}
        form={form}
        name="add_edit_user_form_modal"
        initialValues={selectedUser}
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
          <Select
            placeholder="Select a Role"
            optionFilterProp="children"
            onChange={role => form.setFieldsValue({ role })}
          >
            {
              userRoles.map(role => <Option key={role.value} value={role.value}>{role.label}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="E-Mail"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please enter user e-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="isActive"
          label="Status"
          rules={[
            {
              required: true,
              message: 'Please select user status!',
            },
          ]}
        >
          <Radio.Group>
            <Radio value>Active</Radio>
            <Radio value={false} >In-Active</Radio>
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
  loggedInUserInfo: userShape.isRequired,
  selectedUser: userShape,
};

AddEditUserForm.defaultProps = {
  selectedUser: undefined,
};

export default AddEditUserForm;
