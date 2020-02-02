import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';

const SubjectsCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">Subjects title</h5>
          <h5 className="subhead">Subjects subhead</h5>
        </div>
        <p>Your content here</p>
      </CardBody>
    </Card>
  </Col>
);

export default SubjectsCard;
