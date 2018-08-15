import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Employee.css';

class Employees extends Component {
  render() {
    return (
      this.props.employeeData.map((pep, key) => {
        return (
          <div
            key={key}
            className={'employee bg' + pep.last_name}
            onClick={this.props.onClick}
            >
            <div className={'employee-photo ' + pep.last_name}>
              <i><FontAwesomeIcon icon={faUser} /></i>
            </div>
            <div className="employee-lastname">{pep.last_name}</div>
            <div className="employee-firsname">{pep.first_name}</div>
            <div className="employee-id"> {pep.id}</div>
          </div>
        );
      })
    );
  }
}

export default Employees;
