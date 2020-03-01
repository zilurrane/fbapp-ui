import React, { Component } from 'react';
import { Row, Col } from 'antd';

class FeedbackFormTable extends Component {
  render() {
    return (
      <Row className="feedback-form-table">
        <Col>
          <Row className="feedback-form-table-head-row">
            <Col sm={2}>Sr. No.</Col>
            <Col sm={16}>Question</Col>
            <Col sm={6}>Rating</Col>
          </Row>
          <Row className="feedback-form-table-body-row">
            <Col sm={2}>1</Col>
            <Col sm={16}>Question</Col>
            <Col sm={6}>Rating</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default FeedbackFormTable;
