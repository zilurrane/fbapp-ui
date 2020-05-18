import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const BackupCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Backup title</h5>
          <h5 className="subhead">Backup subhead</h5>
        </div>
        <p>Your content here</p>
      </CardBody>
    </Card>
  </Col>
);

export default BackupCard;
