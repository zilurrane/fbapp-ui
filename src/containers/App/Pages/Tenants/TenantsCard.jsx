import React, { Fragment, Component } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Button } from 'antd';
import TenantsTable from './TenantsTable';

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
                          <h5 className="bold-text">Manage Tenants</h5>
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
                          <TenantsTable />
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
