import React, { Component } from 'react';
import Agenda from './agenda/agenda.js';
import Employees from './Employees';
import EmployeesData from './json/employees';
import Timezone from './json/config';
import Roles from './json/roles';
//import SallyShifts from './json/shiftsSally';
import Shifts from './json/shifts';
import moment from 'moment-timezone';
import { guid } from 'react-agenda';


// Today' s Date now
let now = new Date();
// Using moment-timezone lib to handle:
// Australian Western Standard Time - AWST -  8:54 AM
// Australian Eastern Standard Time - AEST - 10:54 AM
let aug = moment(now);
aug.tz(Timezone.timezone).format('ha z');
let newdatetz = moment('2018-06-18T00:00:00+00:00');
// Display in web browser console today AWST date and time
console.log(''+ Timezone.timezone+ ' AWST');
console.log(newdatetz.tz(Timezone.timezone).format('YYYY-MM-DDTHH:mm:ss Z zz'));

// Use timezone offset to calculate the correct AWST time
let localOffset = now.getTimezoneOffset(); //-600
let tzOffset = newdatetz.tz(Timezone.timezone)._offset; //480
let timezoneOffset = localOffset + tzOffset;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsObjData: [],
      isClicked: false,
      classNameSelected: '',
      employeeData: EmployeesData,
    }
  }

  restructureData() {
    let objData = [];
    Shifts.map((myshift, k) => {
    // employee full name
    const employeeFullName = EmployeesData.map((emp) => {
        if(emp.id === myshift.employee_id) {
          return emp.last_name+' '+emp.first_name;
        }
        return console.log();//removed warning - todo:refactor
    });
    let eFullName = employeeFullName.filter((e) => {
      return e !== undefined;
    });
    // // roles
    const employeeRole = Roles.map((role) => {
      if(role.id === myshift.role_id) {
        return role.name;
      }
      return console.log();//removed warning - todo:refactor
    });
    let eRole = employeeRole.filter((e) => {
      return e !== undefined;
    });

    let datenowstart = new Date(myshift.start_time);
    let datenowend = new Date(myshift.end_time);
      objData.push({
        _id           : guid(),
        name          : eFullName[0],
        startDateTime : new Date(datenowstart.getFullYear(), datenowstart.getMonth(), datenowstart.getDate(), datenowstart.getHours() + timezoneOffset / 60, datenowstart.getMinutes()),
        endDateTime   : new Date(datenowend.getFullYear(), datenowend.getMonth(), datenowend.getDate(), datenowend.getHours() + timezoneOffset / 60, datenowend.getMinutes()),
        classes       : ' color-'+myshift.employee_id+'',
        roleIs        : myshift.role_id,
        roleName      : eRole[0],
        employee_id   : myshift.employee_id,
        shiftId       : myshift.id,
        breakDuration : myshift.break_duration,
      });
      return <div></div>;
    });
    return objData;
  }

  handleClick() {
    this.setState({
      isClicked: true,
      classNameSelected: 'selected',
      itemsObjData: []
    });
  }

  render() {
    const isClicked = this.state.isClicked;
    const employeeData = this.state.employeeData;
    const itemsObjData = this.restructureData();
    const selected = this.state.classNameSelected;
    if(isClicked === true) {
      console.log(isClicked);
    }

    return (
      <div className="appcontainer">
        <div className="col">
          <b>Employee</b>
          <Employees
            onClick={() => this.handleClick()}
            classNameSelected={selected}
            employeeData={employeeData}
            />
        </div>
        <div className="col-agenda">
          <Agenda
            itemObj={itemsObjData}
            />
        </div>
      </div>
    );
  }
}

export default App;
