import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import FeedbackCard from './FeedbackCard';

const FeedbackPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Feedback</h3>
      </Col>
    </Row>
    <Row>
      <FeedbackCard />
    </Row>
  </Container>
);

export default FeedbackPage;
