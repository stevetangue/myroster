// @flow
import React, { Component } from "react";
import { ReactAgenda, ReactAgendaCtrl, Modal } from "react-agenda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Timezone from "../json/config";
import moment from "moment-timezone";
require("moment/locale/en-au.js");

// roles 1,2,3 colors and 4 selected employees highlights
let colors = {
  /*
  "color-1":"rgba(243, 143, 96, 1)" ,
  "color-2":"rgba(245, 255, 162, 1)" ,
  "color-3":"rgba(191, 142, 241, 1)" ,
  "color-4":"rgba(255, 105, 180, 1)" ,
  */

  "color-2634": "rgba(244,67,54,1)",
  "color-2635": "rgba(233,30,99,1)",
  "color-2636": "rgba(156,39,176,1)",
  "color-2637": "rgba(103,58,183,1)",
  "color-2639": "rgba(63,81,181,1)",
  "color-2640": "rgba(33,150,243,1)",
  "color-2641": "rgba(3,169,244,1)",
  "color-2642": "rgba(0,188,212,1)",
  "color-2643": "rgba(0,150,136,1)",
  "color-2644": "rgba(76,175,80,1)",
  "color-2645": "rgba(139,195,74,1)",
  "color-2646": "rgba(205,220,57,1)",
  "color-2647": "rgba(255,235,59,1)"
};
// Today' s Date now
let now = new Date();
// Using moment-timezone lib to handle:
// Australian Western Standard Time - AWST -  8:54 AM
// Australian Eastern Standard Time - AEST - 10:54 AM
let newdatetz = moment("2018-06-18T00:00:00+00:00");
// console.log(newdatetz.tz(Timezone.timezone).format('YYYY-MM-DDTHH:mm:ss.SSSSZ'));

export default class Agenda extends Component {
  state = {
    items: [],
    selected: [],
    cellHeight: 60 / 4,
    showModal: false,
    locale: "en",
    rowsPerHour: 2,
    numberOfDays: 7,
    startDate: newdatetz
      .tz(Timezone.timezone)
      .format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
    isClicked: this.props.isClicked
  };

  handleClickEmployee = () => console.log("event handler called");

  componentDidMount = () =>
    this.setState({
      items: this.props.itemObj,
      isClicked: this.props.isClicked
    });

  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
  }

  componentWillReceiveProps = (next, last) => {
    if (next.items) {
      this.setState({ items: next.items });
    }
  };

  handleItemEdit = (item, openModal) => {
    if (item && openModal === true) {
      this.setState({ selected: [item] });
      return this._openModal();
    }
  };

  handleCellSelection = (item, openModal) => {
    if (this.state.selected && this.state.selected[0] === item) {
      return this._openModal();
    }
    this.setState({ selected: [item] });
  };

  handleDateRangeChange = (startDate, endDate) =>
    this.setState({ startDate: startDate });

  handleRangeSelection = selected => {
    this.setState({ selected: selected, showCtrl: true });
    this._openModal();
  };

  _openModal = () => this.setState({ showModal: true });

  _closeModal = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showModal: false });
  };

  handleItemChange = (items, item) => this.setState({ items: items });

  handleItemSize = (items, item) => this.setState({ items: items });

  removeEvent = (items, item) => this.setState({ items: items });

  addNewEvent = (items, newItems) => {
    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  };

  editEvent = (items, item) => {
    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  };

  render() {
    return (
      <div className="content-expanded ">
        <div className="control-buttons">
          <button
            className="button-control btn-add-shift"
            onClick={this._openModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth() - 3)}
          maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
          startDate={this.state.startDate}
          startAtTime={10}
          cellHeight={this.state.cellHeight}
          locale="en"
          items={this.props.itemObj}
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
          onDateRangeChange={this.handleDateRangeChange.bind(this)}
        />
        {this.state.showModal ? (
          <Modal clickOutside={this._closeModal}>
            <div className="modal-content">
              <ReactAgendaCtrl
                items={this.state.items}
                itemColors={colors}
                selectedCells={this.state.selected}
                Addnew={this.addNewEvent}
                edit={this.editEvent}
              />
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
    );
  }
}
