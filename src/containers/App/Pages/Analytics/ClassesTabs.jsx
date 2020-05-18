import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import AnalyticsCard from './AnalyticsCard';

const { TabPane } = Tabs;

class ClassesTabs extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    departmentName: PropTypes.string.isRequired,
    classesByDepartmentCode: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = { classCode: undefined };

  componentDidUpdate() {
    if (!this.state.classCode && this.props.classesByDepartmentCode && this.props.classesByDepartmentCode.length > 0) {
      this.handleDepartmentClassChange(this.props.classesByDepartmentCode[0].code);
    }
  }

  handleDepartmentClassChange = (value) => {
    this.setState({ classCode: value });
  }

  render() {
    const { departmentCode, departmentName, classesByDepartmentCode } = this.props;
    const { classCode } = this.state;

    return (
      <Fragment>
        <Row>
          <Col>
            <Tabs activeKey={classCode} onChange={this.handleDepartmentClassChange} tabPosition="top">
              {
                classesByDepartmentCode.map(departmentClass => (
                  <TabPane tab={`${departmentClass.name}`} key={departmentClass.code}>
                    <AnalyticsCard departmentCode={departmentCode} departmentName={departmentName} classCode={departmentClass.code} className={departmentClass.name} />
                  </TabPane>
                ))
              }
            </Tabs>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({ classesByDepartmentCode: (state.departments.classes || {})[props.departmentCode] || [] });
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(ClassesTabs);
