import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { getAllTenants, setSelectedTenant } from '../../../redux/actions/tenantActions';

const { Option } = Select;

const tenantShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
});

class TopbarTenant extends PureComponent {
  static propTypes = {
    getAllTenants: PropTypes.func.isRequired,
    setSelectedTenant: PropTypes.func.isRequired,
    tenants: PropTypes.arrayOf(tenantShape).isRequired,
    selectedTenant: tenantShape.isRequired,
    isTenantsLoadingInProgress: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getAllTenants();
  }

  onChange = (value) => {
    const selectedTenant = this.props.tenants.find(tenant => tenant.code === value.value);
    if (selectedTenant) {
      this.props.setSelectedTenant(selectedTenant);
    }
  }

  render() {
    return (
      <div className="topbar__profile">
        <button className="topbar__avatar">
          {
            this.props.tenants &&
            this.props.tenants.length > 0 &&
              <Select
                showSearch
                labelInValue
                defaultValue={{ key: this.props.selectedTenant.code }}
                style={{ width: 100, margin: 'auto 0' }}
                placeholder="Select a Tenant"
                loading={this.props.isTenantsLoadingInProgress}
                optionFilterProp="children"
                onChange={this.onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  this.props.tenants.map(tenant => <Option key={tenant.code} value={tenant.code}>{tenant.code}</Option>)
                }
              </Select>
            }
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isTenantsLoadingInProgress: state.tenant.isTenantsLoadingInProgress, selectedTenant: state.tenant.selectedTenant, tenants: state.tenant.tenants || [] });
const mapDispatchToProps = { getAllTenants, setSelectedTenant };
export default connect(mapStateToProps, mapDispatchToProps)(TopbarTenant);
