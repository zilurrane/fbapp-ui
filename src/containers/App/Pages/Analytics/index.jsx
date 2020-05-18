import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import DepartmentsTabs from './DepartmentsTabs';

const AnalyticsPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Analytics</h3>
      </Col>
    </Row>
    <Row>
      <DepartmentsTabs />
    </Row>
  </Container>
);

export default AnalyticsPage;
