import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuidv1 from 'uuid/v1';

export default class JokeList extends Component {
  // or another way to write this
  /* constructor(props)
       super(props);
       this.state = {
         jokes: [],
         loadingMsg: 'Loading...'
       }
  */
  state = {
    jokeArray: [],
    loadingMsg: 'Loading...'
  };
  // localStorage.setItem('storedJokeArr', JSON.stringify(this.state.jokeArray));
  // const storage = JSON.parse(localStorage.getItem('storedJokeArr'));
  componentDidMount = async () => {
    try {
      for (let i = 0; i < 20; i++) {
        const response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        let obj = {
          joke: response.data.joke,
          // let's try to use given id from API
          // can also use uuidv1() to generate new unique id
          id: response.data.id,
          upVote: 0,
          downVote: 0
        };
        this.setState({
          jokeArray: [...this.state.jokeArray, obj]
        });
      }
      //console.log(response);
    } catch (err) {
      this.setState({
        loadingMsg: 'Response error. Try again...'
      });
    }
  };

  newJokes = () => {
    this.setState(
      {
        jokeArray: [],
        loadingMsg: 'loading new jokes'
      },
      this.componentDidMount
    );
  };

  upVoteCount = evt => {
    //   map over the array, ignore every joke except the one you are upvoting or downvoting
    //  replace that one with +1
    // to get id it would be this.state.jokeArray map it!
    //console.log('event TARGET', evt.target);
    //console.log('event ID', evt.target.id);

    const upJoke = this.state.jokeArray.map((joke, idx) => {
      if (joke.id === evt.target.id) {
        return { ...joke, upVote: joke.upVote + 1 };
      }
      return joke;
    });
    this.setState({
      jokeArray: upJoke
    });
  };
  downVoteCount = evt => {
    // same concept for downVote downJoke is an Array of Objs, each obj is a joke full of properties
    const downJoke = this.state.jokeArray.map(joke => {
      if (joke.id === evt.target.id) {
        return { ...joke, downVote: joke.downVote + 1 };
      }
      return joke;
    });
    this.setState({
      jokeArray: downJoke
    });
  };
  render() {
    // bonus feature
    // why does localStorage have to go under render?
    // store everything? into localStorage with .setItem
    // check if there is localstorage if there is then display
    // add here logic to check for local storage
    // if there is already something there then return/render that instead of something new
    localStorage.setItem('storedJokeArr', JSON.stringify(this.state.jokeArray));
    const storage = JSON.parse(localStorage.getItem('storedJokeArr'));
    //console.log(storage);
    if (storage) {
      const storedJokes = storage.map(j => (
        <Joke
          joke={j.joke}
          key={j.id}
          idFINALLY={j.id}
          upVote={j.upVote}
          downVote={j.downVote}
          countLike={this.upVoteCount}
          countDislike={this.downVoteCount}
        />
      ));
      return (
        <div className="JokeList">
          <ul>{storedJokes}</ul>
          <button onClick={this.newJokes}>New Jokes!</button>
        </div>
      );
    }
    const jokes = this.state.jokeArray.map(j => (
      <Joke
        joke={j.joke}
        key={j.id}
        idFINALLY={j.id}
        upVote={j.upVote}
        downVote={j.downVote}
        countLike={this.upVoteCount}
        countDislike={this.downVoteCount}
      />
    ));
    if (this.state.jokeArray.length < 20) {
      return <div>{this.state.loadingMsg}</div>;
    } else {
      return (
        <div className="JokeList">
          <ul>{jokes}</ul>
          <button onClick={this.newJokes}>New Jokes!</button>
        </div>
      );
    }
  }
}
