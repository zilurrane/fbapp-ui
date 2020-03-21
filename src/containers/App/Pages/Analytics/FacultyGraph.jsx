import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, List, Avatar, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getFacultyFeedback } from '../../../../redux/actions/feedbackActions';

class FacultyGraph extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
    setSelectedFaculty: PropTypes.func.isRequired,
    selectedFaculty: PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }).isRequired,
    getFacultyFeedback: PropTypes.func.isRequired,
    facultyFeedback: PropTypes.arrayOf(PropTypes.object).isRequired,
    facultiesFeedbackSummary: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    this.props.getFacultyFeedback(this.props.departmentCode, this.props.classCode, this.props.selectedFaculty.id);
  }

  render() {
    const {
      departmentCode,
      classCode,
      selectedFaculty,
      facultyFeedback,
      facultiesFeedbackSummary,
    } = this.props;
    return (
      <Fragment>
        <Row className="faculty-comparison-container">
          <Col sm={18} xs={24}>
            <div className="responsive-barchart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={facultyFeedback}
                  maxBarSize={40}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="parameter.code" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="feedback.percentage" name="Percentage" fill="#1890ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col sm={{ span: 5, offset: 1 }} xs={24}>
            <List
              header={<b>Other Faculties</b>}
              itemLayout="horizontal"
              dataSource={facultiesFeedbackSummary.filter(item => item.faculty.name !== selectedFaculty.name)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<Button onClick={() => this.props.setSelectedFaculty({ ...item.faculty, departmentCode, classCode })} className="list-title-button" type="link">{item.faculty.name}</Button>}
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

const mapStateToProps = (state, props) => ({
  facultyFeedback: ((state.feedback.facultyFeedback[props.departmentCode] || {})[props.classCode] || {})[props.selectedFaculty.id],
  facultiesFeedbackSummary: (state.feedback.facultiesFeedbackSummary[props.departmentCode] || {})[props.classCode],
});
const mapDispatchToProps = { getFacultyFeedback };
export default connect(mapStateToProps, mapDispatchToProps)(FacultyGraph);
