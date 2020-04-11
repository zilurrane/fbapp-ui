/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UsersTable from './UsersTable';
import AddEditUserForm from './AddEditUserForm';
import { createUser } from '../../../../redux/actions/tenantActions';
import { userShape } from '../../../../shared/shapes';

class UsersCard extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    loggedInUserInfo: userShape.isRequired,
  }

  state = { visible: false, selectedUser: undefined };

  onCreate(values) {
    this.props.createUser(values);
    this.setVisible(false);
  }

  setVisible(value) {
    this.setState({ visible: value });
  }

  openEditUserPopup(selectedUser) {
    this.setState({ visible: true, selectedUser });
  }

  openAddUserPopup() {
    this.setState({ visible: true, selectedUser: undefined });
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
                            <Button className="card__actions" type="primary" icon={<PlusOutlined />} onClick={() => this.openAddUserPopup()}>
                              Add User
                            </Button>
                          </div>
                          <UsersTable openEditUserPopup={selectedUser => this.openEditUserPopup(selectedUser)} />
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
          selectedUser={this.state.selectedUser}
          key={(this.state.selectedUser || {})._id || Math.random()}
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
