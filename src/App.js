import React, { Component } from 'react';
import Agenda from './agenda/agenda.js';
import Employees from './Employees';

class App extends Component {
  render() {
    return (
      <div className="appcontainer">
        <div className="col">
          <b>Employee</b>
          <Employees />
        </div>
        <div className="col-agenda">
          <Agenda />
        </div>
      </div>
    );
  }
}

export default App;
