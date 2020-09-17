import React from 'react';
import { Container, Row } from 'reactstrap';
import BackupCard from './BackupCard';

const BackupPage = () => (
  <Container className="dashboard">
    <Row>
      <BackupCard />
    </Row>
  </Container>
);

export default BackupPage;
