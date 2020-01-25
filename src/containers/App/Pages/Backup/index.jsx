import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BackupCard from './BackupCard';

const BackupPage = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Backup</h3>
      </Col>
    </Row>
    <Row>
      <BackupCard />
    </Row>
  </Container>
);

export default BackupPage;
