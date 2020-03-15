import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    name: 'Punctual', amt: 96,
  },
  {
    name: 'Behavior', amt: 80,
  },
  {
    name: 'Knowledge', amt: 89,
  },
  {
    name: 'Interaction', amt: 68,
  },
  {
    name: 'Presentation', amt: 94,
  },
  {
    name: 'Command', amt: 90,
  },
  {
    name: 'Creative', amt: 89,
  },
  {
    name: 'Motivative', amt: 68,
  },
  {
    name: 'English', amt: 94,
  },
  {
    name: 'Teacher', amt: 90,
  },
];

class FacultyGraph extends Component {
  static propTypes = {
    departmentCode: PropTypes.string.isRequired,
    classCode: PropTypes.string.isRequired,
  };

  render() {
    const { departmentCode, classCode } = this.props;
    console.log(departmentCode, classCode);
    return (
      <Fragment>
        <Row className="faculty-comparison-container">
          <Col sm={18} xs={24}>
            <BarChart
              data={data}
              width={900}
              height={500}
              maxBarSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amt" fill="#1890ff" />
            </BarChart>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(FacultyGraph);
