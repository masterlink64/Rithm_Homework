import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

// each joke props:
// joke
// key is A SPECIAL PROP only for react to use.  YOU WILL NOT GET ACCESS TO IT
// upVote
// downVote
// countLike(id)
export default class Joke extends Component {
  render() {
    return (
      <div>
        <li>
          {this.props.joke}
          <button
            onClick={this.props.countLike}
            id={this.props.idFINALLY}
            test="WHAT"
          >
            Like
          </button>
          <button onClick={this.props.countDislike} id={this.props.idFINALLY}>
            Dislike
          </button>
        </li>
        <p>
          Upvote:
          {this.props.upVote}
        </p>
        <p>
          DownVote:
          {this.props.downVote}
        </p>
      </div>
    );
  }
}
