import React from 'react';
import { Container, Row } from 'reactstrap';
import FacultiesCard from './FacultiesCard';
import DepartmentsTabs from '../../../../shared/components/tabs/DepartmentsTabs';

const FacultiesPage = () => (
  <Container className="dashboard">
    <Row>
      <DepartmentsTabs component={FacultiesCard} isLoadClasses={false} />
    </Row>
  </Container>
);

export default FacultiesPage;
