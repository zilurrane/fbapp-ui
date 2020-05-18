/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { getAllTenants } from '../../../../redux/actions/tenantActions';

class TenantsTable extends Component {
  static propTypes = {
    tenants: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })).isRequired,
    getAllTenants: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getAllTenants();
  }

  render() {
    const { tenants } = this.props;
    return (
      <Fragment>
        <Table size="sm" hover striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              tenants.length !== 0 ?
                tenants.map((tenant, index) => (
                  <tr key={tenant._id}>
                    <td>{index + 1}</td>
                    <td>{tenant.code}</td>
                    <td>{tenant.name}</td>
                    <td>{tenant.email}</td>
                    <td>{tenant.isActive ? 'Active' : 'In-Active'}</td>
                  </tr>
                ))
                :
                <tr>
                  <td colSpan="5">No tenants found!</td>
                </tr>
            }
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ tenants: state.tenant.tenants || [] });
const mapDispatchToProps = { getAllTenants };
export default connect(mapStateToProps, mapDispatchToProps)(TenantsTable);
