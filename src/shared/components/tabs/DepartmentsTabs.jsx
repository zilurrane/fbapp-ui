/* eslint-disable no-nested-ternary */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { getAllDepartments, getAllClassesByDepartmentCode } from '../../../redux/actions/departmentActions';
import ClassesTabs from './ClassesTabs';
import { AppLoader } from '../AppLoader';

const { TabPane } = Tabs;

class DepartmentsTabs extends Component {
  static propTypes = {
    isLoadingDepartments: PropTypes.bool.isRequired,
    getAllDepartments: PropTypes.func.isRequired,
    getAllClassesByDepartmentCode: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
    component: PropTypes.func.isRequired,
    isLoadClasses: PropTypes.bool,
  };

  static defaultProps = {
    isLoadClasses: true,
  }

  state = { departmentCode: undefined };

  componentDidMount() {
    this.props.getAllDepartments();
  }

  componentDidUpdate() {
    if (!this.state.departmentCode && this.props.departments && this.props.departments.length > 0) {
      this.handleDepartmentChange(this.props.departments[0].code);
    }
  }

  handleDepartmentChange = (value) => {
    this.setState({ departmentCode: value });
    if (this.props.isLoadClasses) {
      this.props.getAllClassesByDepartmentCode(value);
    }
  }

  render() {
    const {
      departments, isLoadClasses, component: ChildComponent, isLoadingDepartments,
    } = this.props;
    const { departmentCode } = this.state;

    return (
      <Fragment>
        <Col md={12}>
          <Row>
            <Col md={12}>
              {
                isLoadingDepartments ?
                  <Card>
                    <CardBody className="card-app-loader">
                      <AppLoader size="large" />
                    </CardBody>
                  </Card>
                  :
                  <Card>
                    <CardBody>
                      {
                        departments && departments.length > 0 ?
                          <Tabs activeKey={departmentCode} onChange={this.handleDepartmentChange} className="department-tabs" tabPosition="top">
                            {
                              departments.map(department => (
                                <TabPane tab={`${department.name}`} key={department.code}>
                                  {
                                    isLoadClasses ?
                                      <ClassesTabs departmentCode={departmentCode} component={ChildComponent} />
                                      :
                                      <ChildComponent departmentCode={departmentCode} />
                                  }
                                </TabPane>
                              ))
                            }
                          </Tabs>
                          :
                          <p>No departments found!</p>
                      }
                    </CardBody>
                  </Card>
              }
            </Col>
          </Row>
        </Col>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ isLoadingDepartments: state.departments.isLoadingDepartments, departments: state.departments.departments, classes: state.departments.classes || {} });
const mapDispatchToProps = { getAllDepartments, getAllClassesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsTabs);
