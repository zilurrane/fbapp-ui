import React from 'react';
import { Container, Row } from 'reactstrap';
import Error404Card from './Error404Card';

const Error404Page = () => (
  <Container className="dashboard">
    <Row>
      <Error404Card />
    </Row>
  </Container>
);

export default Error404Page;
