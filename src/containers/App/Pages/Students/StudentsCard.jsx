import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Checkbox, Row, Col, Divider } from 'antd';
import StudentsGenerator from './StudentsGenerator';

const students = [...Array(60).keys()];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const StudentsCard = ({ departmentCode, classCode }) => (
  <Fragment>
    <Card>
      <Row>
        <Col md={18} xs={24}>
          <StudentsGenerator departmentCode={departmentCode} classCode={classCode} />
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
              <Col key={index + 1} span={3}>
                <Checkbox checked={index % getRandomInt(7)}>{ departmentCode + classCode + (index + 1)}</Checkbox>
              </Col>
            ),
            )
          }
        </Col>
      </Row>
    </Card>
  </Fragment>
);

StudentsCard.propTypes = {
  departmentCode: PropTypes.string.isRequired,
  classCode: PropTypes.string.isRequired,
};

export default StudentsCard;
