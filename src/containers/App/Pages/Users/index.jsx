import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import UsersCard from './UsersCard';

const UsersPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Users</h3>
      </Col>
    </Row>
    <Row>
      <UsersCard />
    </Row>
  </Container>
);

export default UsersPage;
