import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import DashboardCard from './DashboardCard';

const DashboardPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Dashboard</h3>
      </Col>
    </Row>
    <Row>
      <DashboardCard />
    </Row>
  </Container>
);

export default DashboardPage;
