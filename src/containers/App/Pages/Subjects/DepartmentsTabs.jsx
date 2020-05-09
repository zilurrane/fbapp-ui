import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { getAllDepartments, getAllClassesByDepartmentCode } from '../../../../redux/actions/departmentActions';
import ClassesTabs from './ClassesTabs';

const { TabPane } = Tabs;

class DepartmentsTabs extends Component {
  static propTypes = {
    getAllDepartments: PropTypes.func.isRequired,
    getAllClassesByDepartmentCode: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

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
    this.props.getAllClassesByDepartmentCode(value);
  }

  render() {
    const { departments } = this.props;
    const { departmentCode } = this.state;

    return (
      <Fragment>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <Tabs activeKey={departmentCode} onChange={this.handleDepartmentChange} className="department-tabs" tabPosition="top">
                    {
                      departments.map(department => (
                        <TabPane tab={`${department.name}`} key={department.code}>
                          <ClassesTabs departmentCode={departmentCode} />
                        </TabPane>
                      ))
                    }
                  </Tabs>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ departments: state.departments.departments, classes: state.departments.classes || {} });
const mapDispatchToProps = { getAllDepartments, getAllClassesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsTabs);
