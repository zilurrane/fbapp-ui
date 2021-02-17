import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Tabs, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const ExportCard = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Full School" key="1">
            <Button type="primary" icon={<DownloadOutlined />}>
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

export default ExportCard;
