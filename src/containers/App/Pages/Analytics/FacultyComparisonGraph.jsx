import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, List, Avatar, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getFacultiesFeedbackSummary } from '../../../../redux/actions/feedbackActions';

class FacultyComparisonGraph extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
    setSelectedFaculty: PropTypes.func.isRequired,
    getFacultiesFeedbackSummary: PropTypes.func.isRequired,
    facultiesFeedbackSummary: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    this.props.getFacultiesFeedbackSummary(this.props.departmentCode, this.props.classCode);
  }

  render() {
    const { departmentCode, classCode, facultiesFeedbackSummary } = this.props;
    console.log(departmentCode, classCode);
    return (
      <Fragment>
        <Row className="faculty-comparison-container">
          <Col sm={18} xs={24}>
            <div className="responsive-barchart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={facultiesFeedbackSummary}
                  maxBarSize={40}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="faculty.name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="feedback.percentage" fill="#1890ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col sm={{ span: 5, offset: 1 }} xs={24}>
            <List
              header={<b>All Faculties</b>}
              itemLayout="horizontal"
              dataSource={facultiesFeedbackSummary}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<Button onClick={() => this.props.setSelectedFaculty(item.faculty)} className="list-title-button" type="link">{item.faculty.name}</Button>}
                    description={`Feedback: ${item.feedback.percentage}%`}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({ facultiesFeedbackSummary: (state.feedback.facultiesFeedbackSummary[props.departmentCode] || {})[props.classCode] });
const mapDispatchToProps = { getFacultiesFeedbackSummary };
export default connect(mapStateToProps, mapDispatchToProps)(FacultyComparisonGraph);
