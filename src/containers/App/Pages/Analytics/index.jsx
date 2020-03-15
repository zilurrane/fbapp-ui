import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import AnalyticsCard from './AnalyticsCard';

const AnalyticsPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Analytics</h3>
      </Col>
    </Row>
    <Row>
      <AnalyticsCard />
    </Row>
  </Container>
);

export default AnalyticsPage;
