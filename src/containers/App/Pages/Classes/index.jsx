import React from 'react';
import { Container, Row } from 'reactstrap';
import ClassesCard from './ClassesCard';

const ClassesPage = () => (
  <Container className="dashboard">
    <Row>
      <ClassesCard />
    </Row>
  </Container>
);

export default ClassesPage;
