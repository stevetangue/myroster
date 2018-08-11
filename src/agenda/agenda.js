// @flow
import React, { Component } from 'react';
import { ReactAgenda , ReactAgendaCtrl, guid, Modal } from 'react-agenda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Timezone from '../json/config';
import Roles from '../json/roles';
import Shifts from '../json/shifts';
import moment from 'moment-timezone';
import Employees from '../json/employees';
require('moment/locale/en-au.js');


let now = new Date();
// Using moment-timezone lib to handle:
// Australian Western Standard Time - AWST -  8:54 AM
// Australian Eastern Standard Time - AEST - 10:54 AM
let aug = moment("2018-06-18T05:00:00+00:00");
aug.tz(Timezone.timezone).format('ha z');
let newdatetz = moment(now);
console.log('TODAY '+ Timezone.timezone+ ' AWST');
console.log(now)
console.log("TODAY Australia/Brisbane AEST");
console.log(newdatetz.tz(Timezone.timezone).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'));



// roles 1,2,3 colors and 4 selected employees highlights
let colors= {
  'color-1':"rgba(243, 143, 96, 1)" ,
  "color-2":"rgba(245, 255, 162, 1)" ,
  "color-3":"rgba(191, 142, 241, 1)" ,
  "color-4":"rgba(255, 105, 180, 1)" ,
}


let itemsObj = [];
// restructure Shifts.json data provided to fit the react-agenda library
// x56 Shifts per x13 employees
Shifts.map((myshift, k) => {

    const employeeFullName = Employees.map((emp) => {
      if(emp.id == myshift.employee_id) {
        return emp.last_name+' '+emp.first_name;
      }
    });

    const employeeRole = Roles.map((role) => {
      if(role.id == myshift.employee_id) {
        return role.last_name+' '+role.first_name;
      }
    });

    const selectedSally = (() => {
      if (myshift.employee_id === "2635") {
          console.log("SALLY")
      }
    })

    itemsObj.push( {
      _id           : guid(),
      name          : employeeFullName,
      startDateTime : new Date(myshift.start_time),
      endDateTime   : new Date(myshift.end_time),
      classes       : 'color-'+myshift.role_id+'',
      role          : myshift.role_id,
      employee_id   : myshift.employee_id,
      shiftId       : myshift.id,
      breakDuration : myshift.break_duration,
    }
  );
});


// agenda items array obj structure used in the react-agenda library
let items = itemsObj;

export default class Agenda extends Component {
    constructor(props){
    super(props);

    this.state = {
      items:[],
      selected:[],
      cellHeight:(60 / 4),
      showModal:false,
      locale:"eng",
      rowsPerHour:2,
      numberOfDays:7,
      startDate: new Date('2018-06-18T00:00:00+00:00')
    }

    //console.log(this.state.items);
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this.addNewEvent = this.addNewEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.handleCellSelection = this.handleCellSelection.bind(this)
  }

  componentDidMount(){
    this.setState({items:items})
  }

  componentWillReceiveProps(next , last){
    if(next.items){
      this.setState({items:next.items})
    }
  }

  handleItemEdit(item, openModal) {
    if(item && openModal === true){
      this.setState({selected:[item] })
      return this._openModal();
    }
  }

  handleCellSelection(item, openModal) {
    if(this.state.selected && this.state.selected[0] === item){
      return  this._openModal();
    }
       this.setState({selected:[item] })
  }

  handleDateRangeChange (startDate, endDate) {
      this.setState({startDate:startDate })
  }

  handleRangeSelection (selected) {
    this.setState({selected:selected , showCtrl:true})
    this._openModal();
  }

  _openModal(){
    this.setState({showModal:true})
  }
  _closeModal(e){
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false})
  }

  handleItemChange(items , item){
    this.setState({items:items})
  }

  handleItemSize(items , item){
    this.setState({items:items})
  }

  removeEvent(items , item){
      this.setState({ items:items});
  }

  addNewEvent (items , newItems){
    this.setState({showModal:false ,selected:[] , items:items});
    this._closeModal();
  }

  editEvent (items , item){
    this.setState({showModal:false ,selected:[] , items:items});
    this._closeModal();
  }

  render() {
    return (
      <div className="content-expanded ">
        <div className="control-buttons">
          <button className="button-control btn-add-shift" onClick={this._openModal}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth()-3)}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          startDate={this.state.startDate}
          startAtTime={10}
          cellHeight={this.state.cellHeight}
          locale="en"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          //itemComponent={AgendaItem}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)} />
        {
          this.state.showModal? <Modal clickOutside={this._closeModal} >
          <div className="modal-content">
             <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}  />
          </div>
   </Modal>:''
}


       </div>

    );
  }
}
