import React, { Component } from 'react'
import { HopIcon, GlassIcon, KegIcon, BottleIcon } from '../assets/icons'
import './Taplist.scss';

export default class Taplist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        displayPourColumn: true,
        displayServingGlasses: false,
        displayCalorieAlcoholColumn: true,
        headerFontSize: 14,
        beerNameFontSize: 18,
        beerStyleFontSize: 14,
        beerDescriptionFontSize: 12,
        measurementUnit: 'oz',
        gravityUnit: 'oz',
        tapList: [
          {
            gravity: 1.066,
            color: 38,
            balance: 1,
            bitterness: 66,
            name: 'Beer Name',
            style: 'Beer Style ',
            notes: 'Tasting notes',
            calories: '224',
            alcohol: 6.6,
            poured: 0,
            quantity: 526,
            servingSize_s: 12,
            servingSize: 16,
            servingSize_l: 21,
            bottles: 12,
            isBottled: false
          }
        ]
      }
    }
    this.onKegClick = this.onKegClick.bind(this);
    this.onBottleClick = this.onBottleClick.bind(this);
    this.getHeader = this.getHeader.bind(this);

  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem("finalData"))
    // v1.1 update
    // make sure the new values are part of existing data    
    const taplist = this.state.data.tapList[0]
    if (localData) {
      if (localData.displayServingGlasses === undefined) {
        localData.displayServingGlasses = false
      }
      if (localData.displayCalorieAlcoholColumn === undefined) {
        localData.displayCalorieAlcoholColumn = true
      }
      if(localData.measurementUnit === undefined) {
        localData.measurementUnit = 'oz';
      }
      if (localData.display2Columns === undefined) {
        localData.display2Columns = false;
      }
      if (localData.gravityUnit === undefined) {
        localData.gravityUnit = 'oz';
      }

      localData.tapList.forEach(element => {
        if (!element.servingSize_s) {
          element.servingSize_s = taplist.servingSize_s
        }
        if (!element.servingSize_l) {
          element.servingSize_l = taplist.servingSize_l
        }
        if (!element.bottles) {
          element.bottles = taplist.bottles
        }
        if (!element.isBottled) {
          element.isBottled = taplist.isBottled
        }
      });
      this.setState({ data: localData }, () => {
        localStorage.setItem('finalData', JSON.stringify(this.state.data));
      })
    }

  }

  onKegClick(index, event) {
    const itemClicked = event.currentTarget.className === "keg-icon" ? "servingSize" : event.currentTarget.className;
    const data = { ...this.state.data };
    let tapList = [...data.tapList];
    let tapItem = { ...tapList[index] };
    tapItem.poured = Number(tapItem.poured) + Number(tapItem[itemClicked]);
    tapItem.quantity = Number(tapItem.quantity) - Number(tapItem[itemClicked]);
    tapList[index] = tapItem
    data.tapList = tapList
    this.setState({ data: data }, () => {
      localStorage.setItem('finalData', JSON.stringify(this.state.data));
    })
  }

  onBottleClick(index, event) {
    const data = { ...this.state.data };
    let tapList = [...data.tapList];
    let tapItem = { ...tapList[index] };
    tapItem.bottles -= 1;
    tapList[index] = tapItem
    data.tapList = tapList
    this.setState({ data: data }, () => {
      localStorage.setItem('finalData', JSON.stringify(this.state.data));
    })
  }

  getClassNames(displayPourColumn, display2Columns, displayCalorieAlcoholColumn){
    let classString = '';
    if(displayPourColumn){
      classString += ' pour-column-visible'
    }
    if(display2Columns) {
      classString += ' two-column'
    }
    if(displayCalorieAlcoholColumn) {
      classString += ' calorie-alcohol-visible'
    }
    return classString;
  }

  getVolume(quantity, isPoured){
    const {measurementUnit} = this.state.data;
    if(measurementUnit === 'oz') {
      if(isPoured){
        return `${Math.round(quantity*100)/100} fl oz poured`
      } else {
        return `${Math.round(quantity*100)/100} fl oz remaining`
      }
    } else if (measurementUnit === 'ml') {
      let newQuantity = quantity;
      let txt = 'ml';
      if(quantity > 999) {
        newQuantity = quantity/1000;
        txt = 'liter'
      }
      if(isPoured){
        return `${Math.round(newQuantity*100)/100} ${txt} poured`
      } else {
        return `${Math.round(newQuantity*100)/100} ${txt} remaining`
      }
    } else if(measurementUnit === 'dl') {
      if(isPoured){
        return `${Math.round(quantity*100)/100} dl poured`
      } else {
        return `${Math.round(quantity*100)/100} dl remaining`
      }
    } else if(measurementUnit === 'glass') {
      let txt = 'glasses';
      if(quantity < 2) {
        txt = 'glass';
      }
      if(isPoured){
        return `${Math.round(quantity*100)/100} ${txt} poured`
      } else {
        return `${Math.round(quantity*100)/100} ${txt} remaining`
      }
    } 
  }

  getHeader() {
    const {
      displayPourColumn,
      headerFontSize,
      display2Columns,
      displayCalorieAlcoholColumn
    } = this.state.data
    return (
      <div className={"list-header" + this.getClassNames(displayPourColumn, display2Columns, displayCalorieAlcoholColumn)} style={{ fontSize: headerFontSize }} onClick={this.props.headerClicked}>
        <div className="tap-no header-item">
          <div>Tap</div>
          <div>#</div>
        </div>
        <div className="gravity-color header-item">
          <div>Gravity</div>
          <div>Color</div>
        </div>
        <div className="balance-bitterness header-item">
          <div>Balanace</div>
          <div>Bitterness</div>
        </div>
        <div className="beer-details header-item">
          <div>Beer Name & Style</div>
          <div>Tasting Notes</div>
        </div>
        {displayCalorieAlcoholColumn && <div className="calories-alcohol header-item">
          <div>Calories</div>
          <div>Alcohol</div>
        </div>}
        {displayPourColumn && <div className="poured-remaining header-item">
          <div>Poured</div>
          <div>Remaining</div>
        </div>
        }
      </div>
    )
  }


  render() {
    const {
      tapList,
      displayPourColumn,
      displayServingGlasses,
      beerNameFontSize,
      beerStyleFontSize,
      beerDescriptionFontSize,
      display2Columns,
      displayCalorieAlcoholColumn,
      gravityUnit
    } = this.state.data


    return (
      <div className={'container'}>
        <div className={'header-container ' + (display2Columns ? 'two-column' : '')} >
          {this.getHeader()}
          {display2Columns && this.getHeader()}
        </div>

        <div className={'list-container ' + (display2Columns ? 'two-column' : '')}>
          {tapList.map((item, i) => {
            const totalOriginalQuantity = item.quantity + item.poured;
            const filled = ((totalOriginalQuantity - item.poured) / totalOriginalQuantity) * 100;
            return (
              <div className={"tap-row" + this.getClassNames(displayPourColumn, display2Columns, displayCalorieAlcoholColumn)} key={i} style={{ fontSize: beerDescriptionFontSize }}>
                <div className="tap-no row-item">{i + 1}</div>
                <div className="gravity-color row-item">
                  {item.gravity > 0 && <div className="og ">
                    {item.gravity} {gravityUnit}
                  </div>}
                  <div className="glass-icon">
                    <GlassIcon srm={item.color} />
                  </div>
                  {item.color > 0 && <div className="srm ">
                    {item.color} SRM
                  </div>}
                </div>
                <div className="balance-bitterness row-item">
                  {item.balance > 0 && <div className="og">
                    {item.balance} BU:GU
                  </div>}
                  <div className="hop-icon">
                    <HopIcon bitterness={item.bitterness} index={i} />
                  </div>
                  {item.bitterness > 0 && <div className="srm">
                    {item.bitterness} IBU
                  </div>}
                </div>

                <div className="beer-details row-item">
                  <div>
                    <div className="beer-name" style={{ fontSize: beerNameFontSize }}>
                      {item.name}
                    </div>
                    <div className="beer-style" style={{ fontSize: beerStyleFontSize }}>
                      {item.style}
                    </div>
                  </div>
                  <div className={"beer-desc " + (displayServingGlasses ? 'short' : 'full')}>
                    {item.notes}
                  </div>
                  {displayServingGlasses && !item.isBottled && <div className="glasses" >
                    <div className='servingSize_s' onClick={event => this.onKegClick(i, event)}>
                      <GlassIcon srm={5} />
                    </div>
                    <div className='servingSize' onClick={event => this.onKegClick(i, event)}>
                      <GlassIcon srm={10} />
                    </div>
                    <div className='servingSize_l' onClick={event => this.onKegClick(i, event)}>
                      <GlassIcon srm={20} />
                    </div>
                  </div>}
                </div>

                {displayCalorieAlcoholColumn && <div className="calories-alcohol row-item">
                  {item.calories > 0 && <div className="beer-calories">
                    {item.calories} Kcal
                  </div>}
                  {item.alcohol > 0 && <div className="beer-alcohol">
                    {item.alcohol}% ABV
                  </div>}
                </div>}
                {displayPourColumn && !item.isBottled && <div className="poured-remaining row-item">
                  <div className="beer-poured">
                    {this.getVolume(item.poured, true)}
                </div>
                  <div className="keg-icon" onClick={event => this.onKegClick(i, event)}>
                    <KegIcon fill={filled} index={i} />
                  </div>
                  <div className="beer-remaining">
                  {this.getVolume(item.quantity, false)}
                </div>
                </div>}
                {displayPourColumn && item.isBottled && <div className="poured-remaining row-item">
                  <div className="bottle-icon" onClick={event => this.onBottleClick(i, event)}>
                    <BottleIcon srm={item.color} />
                  </div>
                  <div className="beer-remaining">
                    {item.bottles} remaining
                </div>
                </div>}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
