import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Error404Card from './Error404Card';

const Error404Page = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">404</h3>
      </Col>
    </Row>
    <Row>
      <Error404Card />
    </Row>
  </Container>
);

export default Error404Page;
