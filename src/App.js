import React, { Component } from 'react';
import './App.css';
import Agenda from './agenda/agenda.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Employees from './Employees';

class App extends Component {
  render() {
    return (
      <div className="appcontainer">
        <div className="col">
          <b><FontAwesomeIcon icon={faUser} /> Employee</b>
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
