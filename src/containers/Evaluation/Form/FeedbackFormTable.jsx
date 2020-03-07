import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputNumber, Form, Input, Select, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const formShape = {
  getFieldDecorator: PropTypes.func,
};

const facultyShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const facultySubjectsShape = {
  faculty: PropTypes.shape(facultyShape),
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const getFormField = (feedbackParameter, getFieldDecorator) => {
  switch (feedbackParameter.type) {
    case 'TEXTAREA':
      return (
        <Col sm={24} className="feedback-form-field-textarea">
          <Form.Item>
            {getFieldDecorator(feedbackParameter.id, {
              rules: [{ required: true, message: 'Required!' }],
            })(
              <TextArea style={{ width: '100%' }} />,
            )}
          </Form.Item>
        </Col>
      );
    case 'DROPDOWN':
      return (
        <Col sm={4}>
          <Form.Item>
            {getFieldDecorator(feedbackParameter.id, {
              rules: [{ required: true, message: 'Required!' }],
            })(
              <Select style={{ width: '100%' }}>
                {
                  feedbackParameter.options.map(({ value, label }) => <Option key={value} value={value} label={label}>{label}</Option>)
                }
              </Select>,
            )}
          </Form.Item>
        </Col>
      );
    default:
      return (
        <Col sm={4}>
          <Form.Item>
            {getFieldDecorator(feedbackParameter.id, {
              rules: [{ required: true, message: 'Required!' }],
            })(
              <InputNumber style={{ width: '100%' }} min={0} max={feedbackParameter.marks} />,
            )}
          </Form.Item>
        </Col>
      );
  }
};

class FeedbackFormTable extends Component {
  static propTypes = {
    feedbackParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
    form: PropTypes.shape(formShape).isRequired,
    selectedFaculty: PropTypes.shape(facultySubjectsShape),
  }

  static defaultProps = {
    selectedFaculty: null,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, this.props.selectedFaculty);
      }
    });
  };

  render() {
    const { feedbackParameters, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Row className="feedback-form-table">
        <Col>
          <Form onSubmit={this.handleSubmit}>
            <Row className="feedback-form-table-head-row">
              <Col sm={20}>Question</Col>
              <Col sm={4}>Rating</Col>
            </Row>
            {
              feedbackParameters.map((feedbackParameter, index) => (
                <Row key={feedbackParameter.id} className="feedback-form-table-body-row">
                  <Col sm={20}>{ index + 1 }. { feedbackParameter.question }</Col>
                  { getFormField(feedbackParameter, getFieldDecorator) }
                </Row>
              ))
            }
            <Row>
              <Col>
                <Form.Item>
                  <Button disabled={!this.props.selectedFaculty} block type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create({ name: 'feedback_form' })(FeedbackFormTable);
