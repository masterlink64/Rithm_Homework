import React, { Component } from 'react';
import GifForm from './GifForm';
import GifArea from './GifArea';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    gifsArr: [],
    searchTerm: ''
  };
  // searchTerm is coming from the form
  // when I try to run componentDidMount in gif form it would not work
  // says this2.setState is NOT a function
  componentDidMount() {
    // ?q=hilarious&api_key=dc6zaTOxFJmzC&limit=1

    console.log('did mount');
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${
          this.state.searchTerm
        }&api_key=dc6zaTOxFJmzC&limit=3` /*, {
        q: 'hilarious',
        api_key: 'dc6zaTOxFJmzC',
        limit: 3
      }*/
      )
      .then(response => {
        // response.data[0].images.original.url to get the first image url
        // console.log(response);
        const gifs = response.data.data.map(gif => ({
          url: gif.images.original.url,
          id: gif.id
        }));
        // how can I NOT overwrite this????
        this.setState(prevState => ({
          gifsArr: [...prevState.gifsArr, ...gifs]
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }
  search = q => {
    console.log(q);
    this.setState(
      {
        searchTerm: q
      },
      this.componentDidMount
    );
  };
  render() {
    let data = 'Searching...';
    //console.log('search area');
    if (this.state.gifsArr.length > 0) {
      data = this.state.gifsArr.map(gif => (
        <img key={gif.id} src={gif.url} alt="#" />
      ));
    }

    return (
      <div className="App">
        {/* render the form and gif area */}
        <GifForm search={this.search} />
        <h2>Fill this area with Gifs</h2>
        <div className="App-gifArea">{data}</div>
      </div>
    );
  }
}

export default App;
