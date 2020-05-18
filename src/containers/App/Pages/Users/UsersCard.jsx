/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UsersTable from './UsersTable';
import AddEditUserForm from './AddEditUserForm';
import { createUser, updateUser } from '../../../../redux/actions/tenantActions';
import { userShape } from '../../../../shared/shapes';

class UsersCard extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    loggedInUserInfo: userShape.isRequired,
  }

  state = { visible: false, selectedUser: undefined };

  onCreate(data) {
    if (this.state.selectedUser) {
      this.props.updateUser({ query: { _id: this.state.selectedUser._id }, data });
    } else {
      this.props.createUser(data);
    }
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
        <Col span={24}>
          <Card>
            <Row>
              <Col span={24}>
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
          </Card>
        </Col>
        <AddEditUserForm
          loggedInUserInfo={this.props.loggedInUserInfo}
          selectedUser={this.state.selectedUser}
          key={Math.random()}
          visible={this.state.visible}
          isEditView={!!this.state.selectedUser}
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
const mapDispatchToProps = { createUser, updateUser };
export default connect(mapStateToProps, mapDispatchToProps)(UsersCard);
