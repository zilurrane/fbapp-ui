import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(FacultyComparisonGraph);
