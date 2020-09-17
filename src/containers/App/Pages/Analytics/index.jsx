import React from 'react';
import { Container, Row } from 'reactstrap';
import DepartmentsTabs from './DepartmentsTabs';

const AnalyticsPage = () => (
  <Container className="dashboard">
    <Row>
      <DepartmentsTabs />
    </Row>
  </Container>
);

export default AnalyticsPage;
