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
        headerFontSize: 14,
        beerNameFontSize: 18,
        beerStyleFontSize: 14,
        beerDescriptionFontSize: 12,
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
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem("finalData"))
    // v1.1 update
    // make sure the new values are part of existing data    
    const taplist = this.state.data.tapList[0]
    if(localData) {
      if (localData.displayServingGlasses === undefined){
        localData.displayServingGlasses = false 
      }
      localData.tapList.forEach(element => {
        if(!element.servingSize_s) {
          element.servingSize_s = taplist.servingSize_s
        }
        if(!element.servingSize_l) {
          element.servingSize_l = taplist.servingSize_l
        }
        if(!element.bottles) {
          element.bottles = taplist.bottles
        }
        if(!element.isBottled) {
          element.isBottled = taplist.isBottled
        }
      });
      this.setState({data: localData}, () => {
        localStorage.setItem('finalData', JSON.stringify(this.state.data));
      })
    }
    
  }

  onKegClick(index, event) {
    const itemClicked = event.currentTarget.className === "keg-icon" ? "servingSize" :event.currentTarget.className ;
    const data = {...this.state.data};
    let tapList = [...data.tapList];
    let tapItem = {...tapList[index]};
    tapItem.poured = Number(tapItem.poured) + Number(tapItem[itemClicked]);
    tapItem.quantity = Number(tapItem.quantity) -  Number(tapItem[itemClicked]);
    tapList[index] = tapItem
    data.tapList = tapList
    this.setState({data: data}, () => {
      localStorage.setItem('finalData', JSON.stringify(this.state.data));
    }) 
    this.props.resetTimer();
  }

  onBottleClick(index, event) {
    const data = {...this.state.data};
    let tapList = [...data.tapList];
    let tapItem = {...tapList[index]};
    tapItem.bottles -= 1;
    tapList[index] = tapItem
    data.tapList = tapList
    this.setState({data: data}, () => {
      localStorage.setItem('finalData', JSON.stringify(this.state.data));
    }) 
    this.props.resetTimer();
  }


  render() {
    const {
      tapList,
      displayPourColumn,
      displayServingGlasses,
      headerFontSize,
      beerNameFontSize,
      beerStyleFontSize,
      beerDescriptionFontSize
    } = this.state.data

    
    return (
      <>
        <div className={"list-header " + (displayPourColumn ? 'pour-column' : '')} style={{fontSize: headerFontSize}} onClick={this.props.headerClicked}>
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
          <div className="calories-alcohol header-item">
            <div>Calories</div>
            <div>Alcohol</div>
          </div>
          {displayPourColumn && <div className="poured-remaining header-item">
            <div>Poured</div>
            <div>Remaining</div>
          </div>
          }
          
        </div>

        {tapList.map((item, i) => {
          const totalOriginalQuantity = item.quantity + item.poured;
          const filled = ((totalOriginalQuantity-item.poured)/totalOriginalQuantity) * 100;
          return (
            <div className={"tap-row " + (displayPourColumn ? 'pour-column' : '')} key={i} style={{fontSize: beerDescriptionFontSize}}>
              <div className="tap-no row-item">{i + 1}</div>
              <div className="gravity-color row-item">
                <div className="og ">
                  {item.gravity} OG
                </div>
                <div className="glass-icon">
                  <GlassIcon srm={item.color}/>
                </div>
                <div className="srm ">
                  {item.color} SRM
                </div>
              </div>
              <div className="balance-bitterness row-item">
                <div className="og">
                  {item.balance} BU:GU
                </div>
                <div className="hop-icon">
                  <HopIcon bitterness={item.bitterness} index={i}/>
                </div>
                <div className="srm">
                  {item.bitterness} IBU
                </div>
              </div>

              <div className="beer-details row-item">
                <div>
                  <div className="beer-name" style={{fontSize: beerNameFontSize}}>
                    {item.name}
                  </div>
                  <div className="beer-style" style={{fontSize: beerStyleFontSize}}>
                  {item.style}
                  </div>
                </div>
                <div className={"beer-desc " + (displayServingGlasses ? 'short' : 'full')}>
                  {item.notes}
                </div>
                {displayServingGlasses && !item.isBottled && <div className="glasses" >
                  <div className='servingSize_s' onClick={event => this.onKegClick(i, event)}>
                    <GlassIcon srm={5}/>
                  </div>
                  <div className='servingSize' onClick={event => this.onKegClick(i, event)}>
                    <GlassIcon srm={10}/>
                  </div>
                  <div className='servingSize_l' onClick={event => this.onKegClick(i, event)}>
                    <GlassIcon srm={20}/>
                  </div>
                </div>}
              </div>

              <div className="calories-alcohol row-item">
                <div className="beer-calories">
                  {item.calories} Kcal
                </div>
                <div className="beer-alcohol">
                  {item.alcohol}% ABV
                </div>
              </div>
              {displayPourColumn && !item.isBottled && <div className="poured-remaining row-item">
                <div className="beer-poured">
                  {item.poured} fl oz poured
                </div>
                <div className="keg-icon" onClick={event => this.onKegClick(i, event)}>
                  <KegIcon fill={filled} index={i}/>
                </div>
                <div className="beer-remaining">
                {item.quantity} fl oz remaining
                </div>
              </div>}
              {displayPourColumn && item.isBottled && <div className="poured-remaining row-item">
                <div className="bottle-icon" onClick={event => this.onBottleClick(i, event)}>
                <BottleIcon srm={item.color}/>
                </div>
                <div className="beer-remaining">
                {item.bottles} remaining
                </div>
              </div>}
              
            </div>
          )
        })}
      </>
    );
  }
}
