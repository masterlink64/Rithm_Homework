import React, { Component } from 'react';
import PostList from './PostList';
import NewPostForm from './NewPostForm';
import TitleList from './TitleList';
import uuid from 'uuid';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* should render postlist, newform */}
        <TitleList />
        <PostList />
        <NewPostForm />
      </div>
    );
  }
}

export default App;
