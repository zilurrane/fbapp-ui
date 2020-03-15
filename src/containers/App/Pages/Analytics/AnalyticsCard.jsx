import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const AnalyticsCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Analytics title</h5>
          <h5 className="subhead">Analytics subhead</h5>
        </div>
        <p>Your content here</p>
      </CardBody>
    </Card>
  </Col>
);

export default AnalyticsCard;
