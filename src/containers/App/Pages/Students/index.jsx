import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import StudentsCard from './StudentsCard';

const StudentsPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Students</h3>
      </Col>
    </Row>
    <Row>
      <StudentsCard />
    </Row>
  </Container>
);

export default StudentsPage;
