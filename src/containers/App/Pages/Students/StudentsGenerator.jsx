import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Button } from 'antd';
import { studentGenerationDefaults } from '../../../../shared/constants/common-constants';

const formShape = {
  resetFields: PropTypes.func,
  validateFields: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};

class StudentsGenerator extends React.Component {
  static propTypes = {
    form: PropTypes.shape(formShape).isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Form.Item label="Starting roll number">
          {getFieldDecorator('startingRollNumber', {
            initialValue: studentGenerationDefaults.minRollNumber,
            rules: [{ required: false, message: 'Please enter starting roll number!' }],
          })(
            <InputNumber
              size="small"
              min={studentGenerationDefaults.minRollNumber}
              max={studentGenerationDefaults.maxRollNumber}
            />,
            )}
        </Form.Item>
        <Form.Item label="Ending roll number">
          {getFieldDecorator('endingRollNumber', {
            initialValue: studentGenerationDefaults.maxRollNumber,
            rules: [{ required: false, message: 'Please enter ending roll number!' }],
          })(
            <InputNumber
              size="small"
              min={studentGenerationDefaults.minRollNumber}
              max={studentGenerationDefaults.maxRollNumber}
            />,
            )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="small">
            Generate Students
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'students_generator_form' })(StudentsGenerator);
