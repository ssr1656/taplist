import React, { Component } from 'react'
import screenfull from "screenfull";
import './SettingManager.scss';

export default class SettingManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultListValues: {
        gravity: 1.066,
        color: 38,
        balance: 1.00,
        bitterness: 66,
        name: "Beer Name",
        style: "Beer Style ",
        notes: "Tasting notes",
        calories: "224",
        alcohol: 6.6,
        poured: 0,
        quantity: 640,
        servingSize: 16,
        randomNum: this.getRandomNumer()
      },
      finalData: {
        displayTitleBar: true,
        displayPourColumn: true,
        pageTitle: "My Taplist",
        titleFontSize: 50,
        headerFontSize: 14,
        beerNameFontSize: 18,
        beerStyleFontSize: 14,
        beerDescriptionFontSize: 12

      }
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.addRow = this.addRow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.list = {

    }
    this.initlaState = {

    }
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem("finalData"))
    if(localData) {
      this.setState({finalData: localData});
    } else {
      this.setState({finalData: {...this.state.finalData, tapList:[this.state.defaultListValues]}})
    }
  }

  handleInputChange(event) {
    let existingState = this.state.finalData
    const targetName = event.target.name;
    if(targetName === "displayTitleBar" || targetName === "displayPourColumn") {
      existingState[targetName] = !existingState[targetName];
    } else {
      if(targetName === "pageTitle") {
        existingState[targetName] = event.target.value;
      }else {
        existingState[targetName] = Number(event.target.value);
      }
    }
    this.setState({finalData: existingState});
  }

  onValueChange(i, event) {
    let existingState = this.state.finalData;
    const targetValue = event.target.value;
    if(targetValue === "" || isNaN(targetValue)) {
      existingState.tapList[i][event.target.name] = event.target.value
    } else {
      existingState.tapList[i][event.target.name] = Number(event.target.value)
    }
    this.setState({finalData: existingState})
  }

  onSave() {
    localStorage.setItem('finalData', JSON.stringify(this.state.finalData));
    this.props.onDataChange(this.state.finalData)
  }

  onCancel() {
    this.props.switchView();
  }

  addRow() {
    let existingState = this.state.finalData
    existingState.tapList.push({...this.state.defaultListValues, randomNum: this.getRandomNumer()})
    this.setState({finalData: existingState});
  }

  getRandomNumer() {
    return Math.floor(Math.random() * 10000)
  }

  deleteRow(index) {
    let existingState = {...this.state.finalData}
    let tapList = [...existingState.tapList]
    tapList.splice(index, 1);
    existingState.tapList = tapList
    this.setState({finalData: existingState});
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  resetAll() {
    this.setState({finalData: {...this.state.finalData, tapList:[this.state.defaultListValues]}});
    localStorage.removeItem('finalData');
  }


  render() {
    const tapList = this.state.finalData.tapList || []
    const {
      displayPourColumn, 
      displayTitleBar, 
      pageTitle,
      titleFontSize,
      headerFontSize,
      beerNameFontSize,
      beerDescriptionFontSize,
      beerStyleFontSize
    } = this.state.finalData
    return (
      <div className="manager">
        <div className="breadcrums">
          <ol className="breadcrumb ">
            <li>
              <a href="/#" onClick={this.props.switchView}>
                <span>Back to Taplist</span>
              </a>
            </li>
            <li>
              <a href="/#"> 
                <span>Settings</span>
              </a>
            </li>
          </ol>
        </div>

        <div className="top-settings">
        <div className="full-screen">
              <button className="add-row button-secondary" onClick={this.toggleFullscreen}>Make app full screen</button>
            </div>
          <form>
            <div className="misc-settings">
              <label>Display title bar:</label>
              <input
                name="displayTitleBar"
                type="checkbox"
                checked={displayTitleBar}
                onChange={this.handleInputChange} />
              <br/>
              <label>Page title:</label>
              <input
                name="pageTitle"
                type="text"
                value={pageTitle}
                onChange={this.handleInputChange} 
                disabled={!displayTitleBar}/>
              <br/>
              <label>Display Poured/Remaining column:</label>
              <input
                  name="displayPourColumn"
                  type="checkbox"
                  checked={displayPourColumn}
                  onChange={this.handleInputChange} />
            </div>
            

            <fieldset className="font-settings">
              <legend>Set font size:</legend>
              <label>Page Title:</label>
              <input
                name="titleFontSize"
                type="number"
                value={titleFontSize}
                onChange={this.handleInputChange} />
              <br/>
              <label>List Header Text:</label>
              <input
                name="headerFontSize"
                type="number"
                value={headerFontSize}
                onChange={this.handleInputChange} 
              />
              <br/>
              <label>Beer Name:</label>
              <input
                name="beerNameFontSize"
                type="number"
                value={beerNameFontSize}
                onChange={this.handleInputChange} 
              />
              <br/>
              <label>Beer Style:</label>
              <input
                name="beerStyleFontSize"
                type="number"
                value={beerStyleFontSize}
                onChange={this.handleInputChange} 
              />
              <br/>
              <label>Beer Description:</label>
              <input
                name="beerDescriptionFontSize"
                type="number"
                value={beerDescriptionFontSize}
                onChange={this.handleInputChange} 
              />
              </fieldset>
          </form>
        </div>
        
        <div className="table-container">
          <button className="add-row button-secondary" onClick={this.addRow}>+Add Row</button>
          <table>
            <tbody>
              <tr>
                <th>Gravity (OG)</th>
                <th>Color (SRM)</th>
                <th>Balance (BU:GU)</th>
                <th>Bitterness (IBU)</th>
                <th>Name</th>
                <th>Style</th>
                <th>Notes</th>
                <th>Calories (kCal)</th>
                <th>Alcohol (ABV)</th>
                <th>Poured (oz)</th>
                <th>Quantity (oz)</th>
                <th>Pint size (oz)</th>
                <th>Delete row</th>
              </tr>
              {tapList.map((item, i) => {
                return (
                  <tr key={item.randomNum}>
                    <td><input type="number" name="gravity" value={item.gravity} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" name="color" value={item.color} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" name="balance" value={item.balance} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" name="bitterness" value={item.bitterness} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="text" name="name" className="big-input" value={item.name} onChange={event => this.onValueChange(i, event)} /></td>
                    <td><input type="text" name="style" className="big-input" value={item.style} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><textarea name="notes" defaultValue={item.notes} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" name="calories" value={item.calories} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" name="alcohol" value={item.alcohol} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" disabled={!displayPourColumn} name="poured" value={item.poured} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" disabled={!displayPourColumn} name="quantity" value={item.quantity} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><input type="number" disabled={!displayPourColumn} name="servingSize" value={item.servingSize} onChange={event => this.onValueChange(i, event)}/></td>
                    <td><button className="button-error" onClick={event => this.deleteRow(i)}>Delete</button></td>
                  </tr>
                );
              })}
              </tbody>
          </table>
          <button className="btn-reset button-error" onClick={this.resetAll}>Reset All</button>
          <div className="btn-submit">
            <button className="btn-cancel button-warning" onClick={this.onCancel}>Cancel</button>
            <button className="button-success" onClick={this.onSave}>Save</button>
          </div>
          
        </div>
      </div>
    );
  }
}
