import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select } from 'antd';
import { subjectParameters } from '../../../../shared/constants/common-constants';

const { Option } = Select;

class AddEditSubjectFormModal extends Component {
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
        title="Add Subject"
        okText="Submit"
        visible={visible}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Code">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Please input the subject code!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input the subject name!' }],
            })(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="Parameters">
            {getFieldDecorator('parameters', {
              rules: [
                { required: true, message: 'Please select at least one parameter!', type: 'array' },
              ],
            })(
              <Select mode="multiple" placeholder="Please select parameter">
                {
                  subjectParameters.map(param => <Option key={param.value} value={param.value}>{param.label}</Option>)
                }
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'add_edit_subject_form' })(AddEditSubjectFormModal);
