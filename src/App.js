import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Card from './components/card/card';
import Search from './components/search/search';
import Footer from './components/footer/footer';

class App extends Component {
  constructor(props){
    super();
    this.state = {
      games: [],
      pagedata: [],
      ascending: [],
      descending: [],
      filter: [],
      visible: true,
      loading: true,
      currentPage: 1,
      itemsperPage: 100,
    }
    this.ascendingSort = this.ascendingSort.bind(this);
    this.descendingSort = this.descendingSort.bind(this);
    this.platformFilter = this.platformFilter.bind(this);
    this.gameSearch = this.gameSearch.bind(this);
    this.handlePageNumber =this.handlePageNumber.bind(this);
  }
  componentDidMount()
  {
    axios.get('http://starlord.hackerearth.com/gamesext')
      .then(response => response.data)
      .then(data => {
        console.log('data', data);
        let dataPartition = data.slice(0, 100);
        const indexOfLastItem = this.state.currentPage * this.state.itemsperPage; // 1 * 100 = 100 
        const indexOfFirstItem = indexOfLastItem - this.state.itemsperPage;// 100 - 100 = 0
        const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); 
        this.setState(
          {
            games: data,
            pagedata:currentItems,
            loading: false,
          }
        );
      })
      .catch(error => console.log('url Error'));
  }
  ascendingSort(e)
  { 
    e.preventDefault();
    let ascendSort  = this.state.games.sort((c1,c2) => {
      return c2.name - c1.name;
    });
    this.setState({
      pagedata: ascendSort
    })
  }
  descendingSort(e)
  {
    e.preventDefault();
    let descendSort  = this.state.games.sort((c1,c2) => {
      return c1.score - c2.score;
    });
    this.setState({
      pagedata: descendSort
    });
  }
  platformFilter(e){
    console.log('select',e.target.value);
    if(e.target.value!=='All')
    {
      let platformFilter = this.state.games.filter((item, array)=>{
        return item.platform === e.target.value;
      });
      this.setState({
        visible: false,
        filter: platformFilter,
      });
    }
    else{
      this.setState({
        visible: true,
      })
    }
  }
  gameSearch(data){
    if(data.length)
    {
      console.log('received form child', data);
      let searchResult = this.state.games.filter((value) => {
        return value.title.toLowerCase().includes(data.toLowerCase())
      });
      this.setState({
        visible: false,
        filter: searchResult
      })
    }
    else
    {
      this.setState({
        visible: true,
      }) 
    }
  }
  handlePageNumber(e)
  {
    console.log('cliedk');
    this.setState({
      currentPage: Number(e.target.id)
    });
    this.componentDidMount();
  }
  render() {
    const games = this.state.games; 
    const pagedata = this.state.pagedata; 
    console.log('games length', games.length);
    console.log('itemsPerPage', this.state.itemsperPage);
    console.log('value', (games.length / this.state.itemsperPage));
    const pageNumbers=[];
    for (let i = 1; i <= Math.ceil(games.length / this.state.itemsperPage); i++) {
      pageNumbers.push(i);
      console.log('push');
    }
    console.log('pageNumbers', pageNumbers);
    return (
      <div className="App">
        <Header/>
        <Search query={this.gameSearch}/>
        <div className="sort-options max-width">
          <div className="inline-block filter-container">
            Filter By Platform: 
            <select onChange={this.platformFilter}>
              <option value="All">All</option>
              <option value="PlayStation Vita">PlayStation Vita</option>
              <option value="iPad">iPad</option>
              <option value="Xbox 360">Xbox 360</option>
              <option value="PlayStation 3">PlayStation 3</option>
              <option value="Macintosh">Macintosh</option>
              <option value="PC">PC</option>
            </select>
          </div>
          <div className="inline-block sort-container">
            Sort By: 
            <a href="" className="sort-btn" onClick={this.ascendingSort}>
              <img src={require("./img/sort-up.png")} alt="Ascending"/>
            </a>
            <a href="" className="sort-btn" onClick={this.descendingSort}>
              <img src={require("./img/sort-down.png")} alt="Descending"/>
            </a>
          </div>
        </div>
        <div className="game-wrapper-height">
          <div className={this.state.loading ? 'loaded' : 'loading'}>
            <div className="loader"></div>
          </div>
          <div className={this.state.loading ? 'loading' : 'loaded'}>
            <div className="game-list-container max-width">
              {
                this.state.visible ? 
                pagedata.map((item, index) => {
                  return <Card key={index} game-data={item} ui="games"/>
                }) :
                this.state.filter.map((item, index) => {
                  return <Card key={index} game-data={item} ui="filter"/>
                })
              }
            </div>
          </div>
        </div>
        <div className="pagination">
            <ul>
              {
                pageNumbers.map(number => {
                    return <li key={number} id={number} onClick={this.handlePageNumber}>{number}</li>;
                })
              }
            </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
