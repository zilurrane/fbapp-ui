import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TenantsTable from './TenantsTable';
import AddEditTenantForm from './AddEditTenantForm';
import { createTenant, updateTenant } from '../../../../redux/actions/tenantActions';

class TenantsCard extends Component {
  constructor() {
    super();
    this.onAddTenant = this.handleAddTenant.bind(this);
    this.onUpdateTenant = this.handleUpdateTenant.bind(this);
    this.openAddTenantPopup = this.openAddTenantPopupEvent.bind(this);
    this.openUpdateTenantPopup = this.openUpdateTenantPopupEvent.bind(this);
    this.state = { visible: false, isEditView: false, selectedTenant: {} };
  }

  handleAddTenant(values) {
    this.props.createTenant(values);
    this.setState({ visible: false });
  }

  handleUpdateTenant(values) {
    this.props.updateTenant({
      query: {
        _id: this.state.selectedTenant._id,
      },
      data: values,
    });
    this.setState({ visible: false });
  }

  openUpdateTenantPopupEvent(selectedTenant) {
    this.setState({ visible: true, selectedTenant, isEditView: true });
  }

  openAddTenantPopupEvent() {
    this.setState({ visible: true, selectedTenant: {}, isEditView: false });
  }

  processModalSubmit(values) {
    if (this.state.isEditView) {
      this.handleUpdateTenant(values);
    } else {
      this.handleAddTenant(values);
    }
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
                            <Button className="card__actions" type="primary" icon={<PlusOutlined />} onClick={this.openAddTenantPopup}>
                              Add Tenant
                            </Button>
                          </div>
                          <TenantsTable openEditTenantPopup={item => this.openUpdateTenantPopup(item)} />
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
          selectedTenant={this.state.selectedTenant}
          visible={this.state.visible}
          isEditView={this.state.isEditView}
          onSubmit={values => this.processModalSubmit(values)}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { createTenant, updateTenant };
export default connect(mapStateToProps, mapDispatchToProps)(TenantsCard);
