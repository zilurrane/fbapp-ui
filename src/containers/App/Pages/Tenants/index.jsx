import React from 'react';
import { Container, Row } from 'reactstrap';
import TenantsCard from './TenantsCard';

const TenantsPage = () => (
  <Container className="dashboard">
    <Row>
      <TenantsCard />
    </Row>
  </Container>
);

export default TenantsPage;
