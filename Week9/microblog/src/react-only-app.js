import React, { Component } from 'react';
import PostList from './PostList';
import NewPostForm from './NewPostForm';
import uuid from 'uuid';

class App extends Component {
  handleSubmit = (evt, title, body) => {
    evt.preventDefault();
    //console.log(title, body);
    // update the state
    const updatedArr = [
      ...this.state.posts,
      { title: title, body: body, id: uuid() }
    ];
    this.setState({
      posts: updatedArr
    });
  };
  render() {
    return (
      <div className="App">
        {/* should render postlist, newform */}
        <PostList posts={this.state.posts} />
        <NewPostForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
