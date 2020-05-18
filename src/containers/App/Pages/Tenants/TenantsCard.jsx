import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Button } from 'antd';
import TenantsTable from './TenantsTable';
import AddEditTenantForm from './AddEditTenantForm';
import { createTenant } from '../../../../redux/actions/tenantActions';

class TenantsCard extends Component {
  static propTypes = {
    createTenant: PropTypes.func.isRequired,
  }

  state = { visible: false };

  onCreate(values) {
    console.log('Received values of form: ', values);
    this.props.createTenant(values);
    this.setVisible(false);
  }

  setVisible(value) {
    this.setState({ visible: value });
  }

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
                        <div>
                          <div className="card__title">
                            <h5 className="bold-text">&nbsp;</h5>
                            <Button className="card__actions" type="primary" onClick={() => this.setVisible(true)}>
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
        <AddEditTenantForm
          visible={this.state.visible}
          isEditView={false}
          onCreate={values => this.onCreate(values)}
          onCancel={() => {
            this.setVisible(false);
          }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { createTenant };
export default connect(mapStateToProps, mapDispatchToProps)(TenantsCard);
