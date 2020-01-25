import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const UsersCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Users title</h5>
          <h5 className="subhead">Users subhead</h5>
        </div>
        <p>Your content here</p>
      </CardBody>
    </Card>
  </Col>
);

export default UsersCard;
