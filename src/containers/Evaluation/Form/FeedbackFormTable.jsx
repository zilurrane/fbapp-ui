import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, InputNumber, Input, Select, Button } from 'antd';

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
    submitFeedback: PropTypes.func.isRequired,
    feedbackParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
    form: PropTypes.shape(formShape).isRequired,
    selectedFaculty: PropTypes.shape(facultySubjectsShape),
    loggedInUserInfo: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      departmentCode: PropTypes.string.isRequired,
      classCode: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    selectedFaculty: null,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, feedback) => {
      if (!err) {
        console.log('Received values of form: ', feedback, this.props.selectedFaculty);
        const feedbackRequest = {
          fbNo: 1,
          faculty: this.props.selectedFaculty.faculty.id,
          // eslint-disable-next-line no-underscore-dangle
          student: this.props.loggedInUserInfo._id,
          departmentCode: this.props.loggedInUserInfo.departmentCode,
          classCode: this.props.loggedInUserInfo.classCode,
          feedback,
        };
        console.log(feedbackRequest);
        this.props.submitFeedback(feedbackRequest);
      }
    });
  };

  render() {
    const { feedbackParameters, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Row className="feedback-form-table">
        <Col span={24}>
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
              <Col sm={24}>
                <Form.Item sm={24}>
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
