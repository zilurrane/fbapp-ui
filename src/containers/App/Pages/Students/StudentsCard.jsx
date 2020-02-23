import React, { Fragment } from 'react';
import { Card, Checkbox, Row, Col, Divider } from 'antd';
import StudentsGenerator from './StudentsGenerator';

const students = [...Array(60).keys()];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const StudentsCard = () => (
  <Fragment>
    <Card>
      <Row>
        <Col md={18} xs={24}>
          <StudentsGenerator />
        </Col>
      </Row>
      <Row>
        <Col>
          <Divider />
        </Col>
      </Row>
      <Row>
        <Col>
          {
            students.map((_student, index) => (
              <Col key={index + 1} span={2}>
                <Checkbox checked={index % getRandomInt(7)}>{index + 1}</Checkbox>
              </Col>
            ),
            )
          }
        </Col>
      </Row>
    </Card>
  </Fragment>
);

export default StudentsCard;
