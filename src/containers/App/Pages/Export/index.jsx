import React from 'react';
import { Container, Row } from 'reactstrap';
import ExportCard from './ExportCard';

const ExportPage = () => (
  <Container className="dashboard">
    <Row>
      <ExportCard />
    </Row>
  </Container>
);

export default ExportPage;
