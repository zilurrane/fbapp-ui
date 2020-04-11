import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Button } from 'antd';
import UsersTable from './UsersTable';
import AddEditUserForm from './AddEditUserForm';
import { createUser } from '../../../../redux/actions/tenantActions';
import { userShape } from '../../../../shared/shapes';

class UsersCard extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    loggedInUserInfo: userShape.isRequired,
  }

  state = { visible: false };

  onCreate(values) {
    console.log('Received values of form: ', values);
    this.props.createUser(values);
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
                          <UsersTable />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Col>
          </Row>
        </Col>
        <AddEditUserForm
          loggedInUserInfo={this.props.loggedInUserInfo}
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

const mapStateToProps = state => ({ loggedInUserInfo: state.auth.loggedInUserInfo || {} });
const mapDispatchToProps = { createUser };
export default connect(mapStateToProps, mapDispatchToProps)(UsersCard);
