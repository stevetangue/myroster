import React, { Component } from "react";
import Agenda from "./agenda/agenda.js";
import Employees from "./Employees";
import EmployeesData from "./json/employees";
import Timezone from "./json/config";
import Roles from "./json/roles";
import SallyShifts from "./json/shiftsSally";
import Shifts from "./json/shifts";
import moment from "moment-timezone";
import { guid } from "react-agenda";

// Today' s Date now
let now = new Date();
// Using moment-timezone lib to handle:
// Australian Western Standard Time - AWST -  8:54 AM
// Australian Eastern Standard Time - AEST - 10:54 AM
let aug = moment(now);
aug.tz(Timezone.timezone).format("ha z");
let newdatetz = moment("2018-06-18T00:00:00+00:00");
// Display in web browser console today AWST date and time
console.log("" + Timezone.timezone + " AWST");
console.log(newdatetz.tz(Timezone.timezone).format("YYYY-MM-DDTHH:mm:ss Z zz"));

// Use timezone offset to calculate the correct AWST time
let localOffset = now.getTimezoneOffset(); //-600
let tzOffset = newdatetz.tz(Timezone.timezone)._offset; //480
let timezoneOffset = localOffset + tzOffset;

class App extends Component {
  state = {
    itemsObjData: this.restructureData(Shifts),
    isClicked: false,
    classNameSelected: "",
    employeeData: EmployeesData
  };

  restructureData(sh) {
    let objData = [];
    sh.map((myshift, k) => {
      // employee full name
      const employeeFullName = EmployeesData.map(
        emp =>
          emp.id === myshift.employee_id
            ? `${emp.last_name} ${emp.first_name}`
            : ""
      ).filter(e => e !== "");

      //roles
      const employeeRole = Roles.map(
        role => (role.id === myshift.role_id ? role.name : "")
      ).filter(e => e !== "");

      let datenowstart = new Date(myshift.start_time);
      let datenowend = new Date(myshift.end_time);
      return objData.push({
        _id: guid(),
        name: employeeFullName[0],
        startDateTime: new Date(
          datenowstart.getFullYear(),
          datenowstart.getMonth(),
          datenowstart.getDate(),
          datenowstart.getHours() + timezoneOffset / 60,
          datenowstart.getMinutes()
        ),
        endDateTime: new Date(
          datenowend.getFullYear(),
          datenowend.getMonth(),
          datenowend.getDate(),
          datenowend.getHours() + timezoneOffset / 60,
          datenowend.getMinutes()
        ),
        classes: " color-" + myshift.employee_id + "",
        roleIs: myshift.role_id,
        roleName: employeeRole[0],
        employee_id: myshift.employee_id,
        shiftId: myshift.id,
        breakDuration: myshift.break_duration
      });
    });
    return objData;
  }

  handleOnClick = e => {
    const isClicka = [...this.state.isClicked];
    this.setState({
      isClicked: true
    });
    console.log(isClicka);
  };

  render() {
    const {
      classNameSelected,
      employeeData,
      itemsObjData,
      isClicked
    } = this.state;
    return (
      <div className="appcontainer">
        <div className="col">
          <b>Employee</b>
          <Employees
            onSelectedClick={this.handleOnClick}
            classNameSelected={classNameSelected}
            employeeData={employeeData}
          />
        </div>
        <div className="col-agenda">
          <Agenda itemObj={itemsObjData} isClicked={isClicked} />
        </div>
      </div>
    );
  }
}

export default App;
