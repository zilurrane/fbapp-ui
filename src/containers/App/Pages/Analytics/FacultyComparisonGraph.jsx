import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, List, Avatar } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    name: 'Mr.S.K.Nagare', amt: 96,
  },
  {
    name: 'Mrs.M.A.Khade', amt: 80,
  },
  {
    name: 'Mr.A M Kanavaje', amt: 89,
  },
  {
    name: 'Mr. D.M.Satpute', amt: 68,
  },
  {
    name: 'Mr V S Gawade', amt: 94,
  },
  {
    name: 'Mr.Vipul Ajit Sansare', amt: 90,
  },
];

class FacultyComparisonGraph extends Component {
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
          <Col sm={6} xs={24}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={`Feedback: ${item.amt}%`}
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

const mapStateToProps = () => ({});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(FacultyComparisonGraph);
