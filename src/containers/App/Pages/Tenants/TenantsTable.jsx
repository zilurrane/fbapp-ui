/* eslint-disable no-underscore-dangle */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getAllTenants } from '../../../../redux/actions/tenantActions';
import { ActiveStatus } from '../../../../shared/components/ActiveStatus';

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
    openEditTenantPopup: PropTypes.func.isRequired,
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
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
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
                    <td className="text-center">
                      <ActiveStatus isActive={tenant.isActive} />
                    </td>
                    <td className="text-center">
                      <Button size="small" type="primary" onClick={() => this.props.openEditTenantPopup(tenant)} icon={<EditOutlined />} />
                    </td>
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
