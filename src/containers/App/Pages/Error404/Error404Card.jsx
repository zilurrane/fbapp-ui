import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const Error404Card = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">:(</h5>
          <h5 className="subhead">Page Not Found</h5>
        </div>
        <p>We are unable to find page you requested.</p>
      </CardBody>
    </Card>
  </Col>
);

export default Error404Card;
