import React from 'react';
import { Container, Row } from 'reactstrap';
import UsersCard from './UsersCard';

const UsersPage = () => (
  <Container className="dashboard">
    <Row>
      <UsersCard />
    </Row>
  </Container>
);

export default UsersPage;
