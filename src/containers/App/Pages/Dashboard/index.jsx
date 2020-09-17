import React from 'react';
import { Container, Row } from 'reactstrap';
import DashboardCard from './DashboardCard';

const DashboardPage = () => (
  <Container className="dashboard">
    <Row>
      <DashboardCard />
    </Row>
  </Container>
);

export default DashboardPage;
