import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ClassesCard from './ClassesCard';

const ClassesPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Classes</h3>
      </Col>
    </Row>
    <Row>
      <ClassesCard />
    </Row>
  </Container>
);

export default ClassesPage;
