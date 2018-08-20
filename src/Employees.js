import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Employee.css';

class Employees extends Component {
  render() {
    const { employeeData, onSelectedClick } = this.props;
    return (
        employeeData.map((pep, key) => {
        const { last_name, id, first_name} = pep;
        return (
          <div
            key={key}
            className={'employee bg' + last_name}
            onClick={() => onSelectedClick(id)}
            >
            <div className={'employee-photo ' + last_name}>
              <i><FontAwesomeIcon icon={faUser} /></i>
            </div>
            <div className="employee-lastname">{last_name}</div>
            <div className="employee-firsname">{first_name}</div>
            <div className="employee-id"> {id}</div>
          </div>
        );
      })
    );
  }
}

export default Employees;
