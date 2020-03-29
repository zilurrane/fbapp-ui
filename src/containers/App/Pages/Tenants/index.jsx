import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import TenantsCard from './TenantsCard';

const TenantsPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Tenants</h3>
      </Col>
    </Row>
    <Row>
      <TenantsCard />
    </Row>
  </Container>
);

export default TenantsPage;
