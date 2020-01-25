import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const StudentsCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Students title</h5>
          <h5 className="subhead">Students subhead</h5>
        </div>
        <p>Your content here</p>
      </CardBody>
    </Card>
  </Col>
);

export default StudentsCard;
