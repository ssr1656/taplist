import React, { Component } from 'react'
import './App.scss';
import Taplist from './components/Taplist';
import SettingManager from './components/SettingManager'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "My Taplist",
      view: "list",
      displayTitleBar: true,
      titleFontSize: 50
    }
    this.switchView = this.switchView.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem("finalData"))
    if(localData) {
      this.setState({pageTitle: localData.pageTitle, displayTitleBar: localData.displayTitleBar, titleFontSize: localData.titleFontSize});
    }
  }

  switchView(view) {
    this.setState({view: this.state.view === "list"? "settings" : "list"})
  }
  onDataChange(data) {
    this.setState({displayTitleBar: data.displayTitleBar, titleFontSize: data.titleFontSize, pageTitle: data.pageTitle});
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
          </div>
        </header>}
        <main>
          {view === "list"
            ? <Taplist className="kegged" headerClicked={this.switchView}/>
            : <SettingManager switchView={this.switchView} onDataChange={this.onDataChange}/>
          }
          
        </main>
        {/* <footer>Footer</footer> */}
      </div>
    );
  }
}

export default App;
