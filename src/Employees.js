import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import EmployeesData from './json/employees';
import Timezone from './json/config';
import roles from './json/roles';
import Shifts from './json/shifts';
import './Employee.css';

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: EmployeesData,
    };
  }

  render() {
    return (
      this.state.employees.map((pep, key) => {
        console.log(pep);
        return (
          <div key={key} className="employee">
            <div className={'employee-photo bg' + pep.last_name}>
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
