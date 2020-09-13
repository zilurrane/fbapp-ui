import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getAllClassesByDepartmentCode } from '../../../../redux/actions/departmentActions';

class ClassesTable extends Component {
  static propTypes = {
    getAllClassesByDepartmentCode: PropTypes.func.isRequired,
    classes: PropTypes.arrayOf(PropTypes.object).isRequired,
    departmentCode: PropTypes.string.isRequired,
    openEditClassPopup: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllClassesByDepartmentCode(this.props.departmentCode);
  }

  render() {
    const { classes } = this.props;
    return (
      <Table size="sm" hover striped responsive>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '50%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            classes.map((d, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{d.code}</td>
                <td>{d.name}</td>
                <td className="text-center">
                  <Button size="small" type="primary" onClick={() => this.props.openEditClassPopup(d)} icon={<EditOutlined />} />
                </td>
              </tr>
            ))
          }
          {
            classes.length === 0 &&
            <tr>
              <td colSpan="4">No classes found!</td>
            </tr>
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state, props) => ({ classes: state.departments.classes[props.departmentCode] || [] });
const mapDispatchToProps = { getAllClassesByDepartmentCode };
export default connect(mapStateToProps, mapDispatchToProps)(ClassesTable);
