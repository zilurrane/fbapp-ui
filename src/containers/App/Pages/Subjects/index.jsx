import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import DepartmentsTabs from './DepartmentsTabs';

const SubjectsPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Subjects</h3>
      </Col>
    </Row>
    <Row>
      <DepartmentsTabs />
    </Row>
  </Container>
);

export default SubjectsPage;
