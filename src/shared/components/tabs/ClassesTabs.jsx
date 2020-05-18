import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { AppLoader } from '../AppLoader';

const { TabPane } = Tabs;

class ClassesTabs extends Component {
  static propTypes = {
    isLoadingClasses: PropTypes.bool.isRequired,
    departmentCode: PropTypes.string.isRequired,
    classesByDepartmentCode: PropTypes.arrayOf(PropTypes.object).isRequired,
    component: PropTypes.func.isRequired,
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
    const {
      departmentCode, classesByDepartmentCode, component: ChildComponent, isLoadingClasses,
    } = this.props;
    const { classCode } = this.state;

    return (
      <Fragment>
        <Row>
          {
            isLoadingClasses ?
              <Col className="card-app-loader">
                <AppLoader size="large" />
              </Col>
              :
              <Col>
                <Tabs activeKey={classCode} onChange={this.handleDepartmentClassChange} tabPosition="top">
                  {
                    classesByDepartmentCode.map(departmentClass => (
                      <TabPane tab={`${departmentClass.name}`} key={departmentClass.code}>
                        <ChildComponent departmentCode={departmentCode} classCode={departmentClass.code} />
                      </TabPane>
                    ))
                  }
                </Tabs>
              </Col>
          }
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({ isLoadingClasses: state.departments.isLoadingClasses, classesByDepartmentCode: (state.departments.classes || {})[props.departmentCode] || [] });
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(ClassesTabs);
