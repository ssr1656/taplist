import React, { Component } from 'react'
import './App.scss';
import Taplist from './components/Taplist';
import SettingManager from './components/SettingManager';
import ms from 'pretty-ms'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "My Taplist",
      view: "list",
      displayTitleBar: true,
      titleFontSize: 50,
      time: 0,
      start: 0
    }
    this.switchView = this.switchView.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.timer = null;
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem("finalData"))
    if(localData) {
      this.setState({pageTitle: localData.pageTitle, displayTitleBar: localData.displayTitleBar, titleFontSize: localData.titleFontSize});
    }
    this.startTimer();
  }

  switchView(view) {
    this.setState({view: this.state.view === "list"? "settings" : "list"})
  }

  onDataChange(data) {
    this.setState({
      displayTitleBar: data.displayTitleBar, 
      titleFontSize: data.titleFontSize, 
      pageTitle: data.pageTitle
    });
  }

  startTimer() {
    this.setState({
      time: this.state.time,
      start: Date.now()
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1)
  }

  resetTimer() {
    clearInterval(this.timer)
    this.setState({time: 0}, () => {
      this.startTimer();
    })
  }

  render() {
    const {view, displayTitleBar, titleFontSize, pageTitle} = this.state;
    const titleStyle = {
      fontSize: titleFontSize
    }
    return (
      <div className="App">
        {displayTitleBar && <header>
          <div className="title" style={titleStyle}>
            {pageTitle}
          </div>
          <div className="second-logo">
            {/* Optional */}
            <span>{ms(this.state.time, {secondsDecimalDigits: 0})}</span>
          </div>
        </header>}
        <main>
          {view === "list"
            ? <Taplist className="kegged" headerClicked={this.switchView} resetTimer={this.resetTimer}/>
            : <SettingManager switchView={this.switchView} onDataChange={this.onDataChange}/>
          }
          
        </main>
        {/* <footer>Footer</footer> */}
      </div>
    );
  }
}

export default App;
