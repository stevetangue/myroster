import React, { Component } from 'react';
import Agenda from './agenda/agenda.js';
import Employees from './Employees';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: true
    }
  }

  handleClick(i) {
    // TODO when clicking employee only display her/his shifts
    console.log(i);
  }

  render() {
    return (
      <div className="appcontainer">
        <div className="col">
          <b>Employee</b>
          <Employees onClick={i => this.handleClick(i)}/>
        </div>
        <div className="col-agenda">
          <Agenda />
        </div>
      </div>
    );
  }
}

export default App;
