import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllClassesByDepartmentCode } from '../../../../redux/actions/departmentActions';

class ClassesTable extends Component {
  static propTypes = {
    getAllClassesByDepartmentCode: PropTypes.func.isRequired,
    classes: PropTypes.arrayOf(PropTypes.object).isRequired,
    departmentCode: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getAllClassesByDepartmentCode(this.props.departmentCode);
  }

  render() {
    const { classes } = this.props;
    return (
      <Table size="sm" hover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            classes.map((d, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{d.code}</td>
                <td>{d.name}</td>
              </tr>
            ))
          }
          {
            classes.length === 0 &&
            <tr>
              <td colSpan="3">No classes found!</td>
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
