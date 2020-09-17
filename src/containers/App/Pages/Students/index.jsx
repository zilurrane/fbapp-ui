import React from 'react';
import { Container, Row } from 'reactstrap';
import DepartmentsTabs from '../../../../shared/components/tabs/DepartmentsTabs';
import StudentsCard from './StudentsCard';

const StudentsPage = () => (
  <Container className="dashboard">
    <Row>
      <DepartmentsTabs component={StudentsCard} />
    </Row>
  </Container>
);

export default StudentsPage;
