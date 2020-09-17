import React from 'react';
import { Container, Row } from 'reactstrap';
import DepartmentsTabs from '../../../../shared/components/tabs/DepartmentsTabs';
import SubjectsCard from './SubjectsCard';

const SubjectsPage = () => (
  <Container className="dashboard">
    <Row>
      <DepartmentsTabs component={SubjectsCard} />
    </Row>
  </Container>
);

export default SubjectsPage;
