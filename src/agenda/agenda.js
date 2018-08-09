// @flow
import React, { Component } from 'react';
import { ReactAgenda , ReactAgendaCtrl, guid, Modal } from 'react-agenda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
let now = new Date();

require('moment/locale/fr.js');
    let colors= {
      'color-1':"rgba(243, 143, 96, 1)" ,
      "color-2":"rgba(245, 255, 162, 1)" ,
      "color-3":"rgba(191, 142, 241, 1)" ,
    }

let items = [
  {
   _id            :guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1 color-4'
  },
  {
   _id            :guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2'
  }
];

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
      startDate: new Date('08/18/2018')
    }
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this.addNewEvent = this.addNewEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.changeView = this.changeView.bind(this)
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

  zoomIn(){
    let num = this.state.cellHeight + 15
    this.setState({cellHeight:num})
  }

  zoomOut(){
    let num = this.state.cellHeight - 15
    this.setState({cellHeight:num})
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

  changeView (days , event ){
    this.setState({numberOfDays:days})
  }

  render() {
    return (
      <div className="content-expanded ">
        <div className="control-buttons">
          <button className="button-control" onClick={this._openModal}>
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
