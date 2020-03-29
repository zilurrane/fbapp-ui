import React, { Fragment, Component } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Table, Button } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

class TenantsCard extends Component {
  render() {
    return (
      <Fragment>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col>
                        <div className="card__title">
                          <h5 className="bold-text">Tenants title</h5>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <div className="card__title">
                            <h5 className="bold-text">&nbsp;</h5>
                            <Button className="card__actions" type="primary">
                              Add
                            </Button>
                          </div>
                          <Table columns={columns} dataSource={data} size="middle" bordered />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Col>
          </Row>
        </Col>
      </Fragment>
    );
  }
}

export default TenantsCard;
