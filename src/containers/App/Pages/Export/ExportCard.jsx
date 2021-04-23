import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Tabs, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import { callUnAuthApi } from '../../../../shared/helpers/fetch-helper';

const { TabPane } = Tabs;

const downloadExcel = (tenantId) => {
  let filename;
  callUnAuthApi('https://fbapp-report-api.herokuapp.com/report/feedback', { method: 'GET', headers: { TenantId: tenantId } })
    .then((response) => {
      if (response.status === 200) {
        filename = response.headers.get('content-disposition');
        // eslint-disable-next-line prefer-destructuring
        filename = filename.split('filename=')[1];
        return response.blob();
      }
      return new Promise();
    })
    .then((body) => {
      saveAs(body, filename, { type: 'application/octet-stream' });
    });
};

const ExportCard = ({ tenantId }) => (
  <Col md={12}>
    <Card>
      <CardBody>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Full School" key="1">
            <Button onClick={() => downloadExcel(tenantId)} type="primary" icon={<DownloadOutlined />}>
              Feedback Excel
            </Button>
          </TabPane>
          <TabPane tab="Department Wise" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Class Wise" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </CardBody>
    </Card>
  </Col>
);

const mapStateToProps = state => ({ tenantId: (state.tenant.selectedTenant || {})._id });
export default connect(mapStateToProps, null)(ExportCard);
