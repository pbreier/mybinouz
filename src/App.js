import React, { Component } from 'react';
import pink_elephant from './res/pink_elephant.svg';
import './App.css';

let listBeers = [];

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      filterList: [],
      isClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch('http://localhost:3000/beer')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response,
          filterList: response,
          isClicked: false
        })
      }).catch((err) => console.log(err))
  }
  
  handleClick() {
    var sortedList = this.state.filterList.slice(0);
    var filterlist = this.state.data.slice(0, 5);
    sortedList.sort((a, b) => {
      return (a.alcohol - b.alcohol) / (b.price - a.price);
    })
    filterlist.sort();
    if (this.state.isClicked === false) {
      this.setState({
        data: filterlist,
        isClicked: true,
      });
    }
    else {
      this.state.isClicked = false;
      this.setState({
        data: sortedList,
        isClicked: false
      });
    }
  }

  render() {
    listBeers = this.state.data.map((d) =>
      <tr key={d.name}>
        <td>{d.name}</td>
        <td>{d.alcohol}° </td>
        <td>{d.price}€ </td>
      </tr>);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MyBinouze</h1>
          <p>Click on the elephant to choose the 5 best beers</p>
          <a onClick={this.handleClick.bind(this)}><img src={pink_elephant} className="App-logo" /></a>
        </header>
        <table id="beers">
          <thead><tr>
            <th>Beer</th>
            <th>Alcohol</th>
            <th>Price</th>
          </tr></thead>
          <tbody>{listBeers}</tbody>
        </table>
      </div>
    )
  }


}

export default App;
