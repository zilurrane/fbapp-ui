import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Button } from 'antd';
import { connect } from 'react-redux';
import { studentGenerationDefaults } from '../../../../shared/constants/common-constants';
import { generateStudents } from '../../../../redux/actions/departmentActions';

const formShape = {
  resetFields: PropTypes.func,
  validateFields: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};

class StudentsGenerator extends React.Component {
  static propTypes = {
    form: PropTypes.shape(formShape).isRequired,
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
    generateStudents: PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { departmentCode, classCode } = this.props;
        const generateStudentsRequest = { departmentCode, classCode, ...values };
        this.props.generateStudents(generateStudentsRequest);
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
            rules: [{ required: true, message: 'Please enter starting roll number!' }],
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
            rules: [{ required: true, message: 'Please enter ending roll number!' }],
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

const mapDispatchToProps = { generateStudents };
export default Form.create({
  name: 'students_generator_form',
})(
  connect(null, mapDispatchToProps)(StudentsGenerator),
);
