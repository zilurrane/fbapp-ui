/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { getAllUsers } from '../../../../redux/actions/tenantActions';
import { tenantShape } from '../../../../shared/shapes';

class UsersTable extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })).isRequired,
    getAllUsers: PropTypes.func.isRequired,
    selectedTenant: PropTypes.shape(tenantShape).isRequired,
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedTenant.code !== this.props.selectedTenant.code) {
      this.props.getAllUsers();
    }
  }

  render() {
    const { users } = this.props;
    return (
      <Fragment>
        <Table size="sm" hover striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Role</th>
              <th>E-Mail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              users.length !== 0 ?
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.isActive ? 'Active' : 'In-Active'}</td>
                  </tr>
                ))
                :
                <tr>
                  <td colSpan="5">No users found!</td>
                </tr>
            }
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ users: state.tenant.users || [], selectedTenant: state.tenant.selectedTenant });
const mapDispatchToProps = { getAllUsers };
export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
