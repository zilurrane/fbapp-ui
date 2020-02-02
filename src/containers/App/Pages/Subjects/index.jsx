import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import SubjectsCard from './SubjectsCard';

const SubjectsPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Subjects</h3>
      </Col>
    </Row>
    <Row>
      <SubjectsCard />
    </Row>
  </Container>
);

export default SubjectsPage;
