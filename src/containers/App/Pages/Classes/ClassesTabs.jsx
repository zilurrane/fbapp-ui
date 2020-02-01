import { Tabs } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const { TabPane } = Tabs;

class ClassesTabs extends Component {
  static propTypes = {
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  render() {
    const { departments } = this.props;
    return (
      <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
        {departments.map(department => (
          <TabPane tab={`${department.name}`} key={department.code}>Content of tab {department.code}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({ departments: state.departments.departments });
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ClassesTabs);
