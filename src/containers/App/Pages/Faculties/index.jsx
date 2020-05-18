import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import FacultiesCard from './FacultiesCard';
import DepartmentsTabs from '../../../../shared/components/tabs/DepartmentsTabs';

const FacultiesPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Faculties</h3>
      </Col>
    </Row>
    <Row>
      <DepartmentsTabs component={FacultiesCard} isLoadClasses={false} />
    </Row>
  </Container>
);

export default FacultiesPage;
