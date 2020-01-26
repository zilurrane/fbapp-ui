import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import DepartmentsTable from './DepartmentsTable';

const ClassesCard = () => (
  <Col md={12}>
    <Row>
      <Col md={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Manage Departments</h5>
            </div>
            <DepartmentsTable />
          </CardBody>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Manage Classes</h5>
            </div>
            <DepartmentsTable />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Col>
);

export default ClassesCard;
